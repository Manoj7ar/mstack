import http from "node:http";
import { randomUUID } from "node:crypto";
import { URL, pathToFileURL } from "node:url";
import {
  createIdeaBodySchema,
  patchIdeaBodySchema,
  patchPreferencesSchema,
} from "./schemas.js";
import { log } from "./logger.js";
import { checkRateLimit, resetRateLimitState } from "./rateLimit.js";
import { openApiDocument } from "./openapi.js";
import { API_VERSION, REPO_PRODUCT_NAME, SERVICE_NAME } from "./version.js";
import {
  FileIdeasStore,
  InMemoryIdeasStore,
  isIdempotencyMismatch,
  type IdeasStore,
} from "./store.js";

const LIST_DEFAULT_LIMIT = 50;
const LIST_MAX_LIMIT = 100;

const PORT = Number(process.env.PORT) || 3000;

export type AppServerOptions = {
  /** Override env RATE_LIMIT_MAX for tests. */
  rateLimitMax?: number;
  /** Override env RATE_LIMIT_WINDOW_MS for tests. */
  rateLimitWindowMs?: number;
  /** Injected store (tests); default from env or in-memory. */
  store?: IdeasStore;
};

function resolveStoreFromEnv(): IdeasStore {
  const path = process.env.IDEAS_STORE_PATH;
  if (path && path.length > 0) {
    return new FileIdeasStore(path);
  }
  return new InMemoryIdeasStore();
}

function resolveRateConfig(opts: AppServerOptions): {
  max: number;
  windowMs: number;
} {
  const envMax = Number(process.env.RATE_LIMIT_MAX);
  const envWindow = Number(process.env.RATE_LIMIT_WINDOW_MS);
  return {
    max: opts.rateLimitMax ?? (Number.isFinite(envMax) && envMax > 0 ? envMax : 120),
    windowMs:
      opts.rateLimitWindowMs ??
      (Number.isFinite(envWindow) && envWindow > 0 ? envWindow : 60_000),
  };
}

export type RequestContext = {
  store: IdeasStore;
  rateMax: number;
  rateWindowMs: number;
};

function json(
  res: http.ServerResponse,
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
): void {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  });
  res.end(JSON.stringify(body));
}

function sendNoContent(res: http.ServerResponse): void {
  res.writeHead(204);
  res.end();
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c as Buffer));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function clientKey(req: http.IncomingMessage): string {
  const session = req.headers["x-session-id"];
  if (typeof session === "string" && session.length > 0) {
    return `s:${session}`;
  }
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) {
    return `ip:${fwd.split(",")[0]?.trim() ?? "unknown"}`;
  }
  return `ip:${req.socket.remoteAddress ?? "unknown"}`;
}

export async function handleRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  ctx: RequestContext,
): Promise<void> {
  const requestId =
    (typeof req.headers["x-request-id"] === "string" &&
      req.headers["x-request-id"]) ||
    randomUUID();

  res.setHeader("X-Request-ID", requestId);

  if (!req.url || !req.method) {
    json(res, 400, {
      error: "bad_request",
      message: "Missing URL or method",
      requestId,
    });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);
  const rl = checkRateLimit(
    clientKey(req),
    ctx.rateMax,
    ctx.rateWindowMs,
  );
  if (!rl.ok) {
    res.setHeader("Retry-After", String(Math.ceil(rl.retryAfterMs / 1000)));
    json(res, 429, {
      error: "rate_limited",
      message: "Too many requests",
      requestId,
      retryAfterMs: rl.retryAfterMs,
    });
    log("warn", "rate_limited", { requestId, key: clientKey(req) });
    return;
  }

  const { store } = ctx;

  try {
    if (req.method === "GET" && url.pathname === "/health") {
      json(res, 200, { ok: true, requestId });
      return;
    }

    if (req.method === "GET" && url.pathname === "/v1/meta") {
      json(res, 200, {
        product: REPO_PRODUCT_NAME,
        service: SERVICE_NAME,
        apiVersion: API_VERSION,
        node: process.version,
        requestId,
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/v1/openapi.json") {
      json(res, 200, openApiDocument());
      return;
    }

    if (req.method === "GET" && url.pathname === "/v1/ideas") {
      const tag = url.searchParams.get("tag") ?? undefined;
      const limitRaw = url.searchParams.get("limit");
      let limit = LIST_DEFAULT_LIMIT;
      if (limitRaw !== null && limitRaw !== "") {
        const n = Number(limitRaw);
        if (!Number.isInteger(n) || n < 1 || n > LIST_MAX_LIMIT) {
          json(res, 400, {
            error: "invalid_limit",
            message: `limit must be an integer from 1 to ${LIST_MAX_LIMIT}`,
            requestId,
          });
          return;
        }
        limit = n;
      }
      const cursorParam = url.searchParams.get("cursor");
      const cursor =
        cursorParam !== null && cursorParam.length > 0
          ? cursorParam
          : undefined;
      const page = store.listIdeasPage(tag, limit, cursor);
      if (page === null) {
        json(res, 400, {
          error: "invalid_cursor",
          message: "cursor is missing, malformed, or does not match the current result set",
          requestId,
        });
        return;
      }
      const body: {
        ideas: typeof page.ideas;
        requestId: string;
        nextCursor?: string;
      } = { ideas: page.ideas, requestId };
      if (page.nextCursor !== undefined) {
        body.nextCursor = page.nextCursor;
      }
      json(res, 200, body);
      return;
    }

    const ideaMatch = /^\/v1\/ideas\/([^/]+)$/.exec(url.pathname);
    if (ideaMatch) {
      const ideaId = ideaMatch[1]!;

      if (req.method === "GET") {
        const idea = store.getIdea(ideaId);
        if (!idea) {
          json(res, 404, {
            error: "not_found",
            message: "Idea not found",
            requestId,
          });
          return;
        }
        json(res, 200, { idea, requestId });
        return;
      }

      if (req.method === "PATCH") {
        const raw = await readBody(req);
        let parsed: unknown;
        try {
          parsed = raw.length ? JSON.parse(raw) : {};
        } catch {
          json(res, 400, {
            error: "invalid_json",
            message: "Body must be valid JSON",
            requestId,
          });
          return;
        }
        const bodyResult = patchIdeaBodySchema.safeParse(parsed);
        if (!bodyResult.success) {
          json(res, 422, {
            error: "validation_error",
            message: "Invalid idea patch",
            requestId,
            details: bodyResult.error.flatten(),
          });
          return;
        }
        const sessionHeader = req.headers["x-session-id"];
        const sessionId =
          typeof sessionHeader === "string" && sessionHeader.length > 0
            ? sessionHeader
            : "anonymous";
        const updated = store.updateIdea(ideaId, bodyResult.data, sessionId);
        if (!updated) {
          json(res, 404, {
            error: "not_found",
            message: "Idea not found",
            requestId,
          });
          return;
        }
        log("info", "idea_updated", {
          requestId,
          ideaId: updated.id,
          sessionId,
        });
        json(res, 200, { idea: updated, requestId });
        return;
      }

      if (req.method === "DELETE") {
        const removed = store.deleteIdea(ideaId);
        if (!removed) {
          json(res, 404, {
            error: "not_found",
            message: "Idea not found",
            requestId,
          });
          return;
        }
        log("info", "idea_deleted", { requestId, ideaId });
        sendNoContent(res);
        return;
      }
    }

    if (req.method === "POST" && url.pathname === "/v1/ideas") {
      const raw = await readBody(req);
      let parsed: unknown;
      try {
        parsed = raw.length ? JSON.parse(raw) : {};
      } catch {
        json(res, 400, {
          error: "invalid_json",
          message: "Body must be valid JSON",
          requestId,
        });
        return;
      }
      const bodyResult = createIdeaBodySchema.safeParse(parsed);
      if (!bodyResult.success) {
        json(res, 422, {
          error: "validation_error",
          message: "Invalid idea payload",
          requestId,
          details: bodyResult.error.flatten(),
        });
        return;
      }
      const sessionHeader = req.headers["x-session-id"];
      const sessionId =
        typeof sessionHeader === "string" && sessionHeader.length > 0
          ? sessionHeader
          : "anonymous";
      const idem = req.headers["idempotency-key"];
      const idempotencyKey =
        typeof idem === "string" && idem.length > 0 ? idem : undefined;
      const created = store.createIdea(
        bodyResult.data,
        sessionId,
        idempotencyKey,
      );
      if (isIdempotencyMismatch(created)) {
        json(res, 409, {
          error: "idempotency_conflict",
          message:
            "Idempotency-Key was already used with a different request body",
          requestId,
        });
        return;
      }
      log("info", "idea_created", {
        requestId,
        ideaId: created.id,
        sessionId,
      });
      json(res, 201, { idea: created, requestId });
      return;
    }

    if (req.method === "PATCH" && url.pathname === "/v1/session/preferences") {
      const sessionHeader = req.headers["x-session-id"];
      if (typeof sessionHeader !== "string" || !sessionHeader.length) {
        json(res, 400, {
          error: "missing_session",
          message: "X-Session-ID header is required",
          requestId,
        });
        return;
      }
      const raw = await readBody(req);
      let parsed: unknown;
      try {
        parsed = raw.length ? JSON.parse(raw) : {};
      } catch {
        json(res, 400, {
          error: "invalid_json",
          message: "Body must be valid JSON",
          requestId,
        });
        return;
      }
      const prefResult = patchPreferencesSchema.safeParse(parsed);
      if (!prefResult.success) {
        json(res, 422, {
          error: "validation_error",
          message: "Invalid preferences",
          requestId,
          details: prefResult.error.flatten(),
        });
        return;
      }
      const preferences = store.patchSessionPreferences(
        sessionHeader,
        prefResult.data,
      );
      json(res, 200, { preferences, requestId });
      return;
    }

    json(res, 404, {
      error: "not_found",
      message: "Route not found",
      requestId,
    });
  } catch (e) {
    log("error", "unhandled_error", {
      requestId,
      err: e instanceof Error ? e.message : String(e),
    });
    json(res, 500, {
      error: "internal_error",
      message: "Unexpected server error",
      requestId,
    });
  }
}

export function createAppServer(opts: AppServerOptions = {}): http.Server {
  const rate = resolveRateConfig(opts);
  const store = opts.store ?? resolveStoreFromEnv();
  const ctx: RequestContext = {
    store,
    rateMax: rate.max,
    rateWindowMs: rate.windowMs,
  };
  return http.createServer((req, res) => {
    void handleRequest(req, res, ctx);
  });
}

export { resetRateLimitState };

const isMain =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]!).href;
if (isMain) {
  const server = createAppServer();
  server.listen(PORT, () => {
    log("info", "server_listening", { port: PORT });
  });
}
