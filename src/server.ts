import http from "node:http";
import { randomUUID } from "node:crypto";
import { URL, pathToFileURL } from "node:url";
import { createIdeaBodySchema, patchPreferencesSchema } from "./schemas.js";
import { log } from "./logger.js";
import { checkRateLimit } from "./rateLimit.js";
import {
  createIdea,
  getIdea,
  listIdeas,
  patchSessionPreferences,
} from "./store.js";

const PORT = Number(process.env.PORT) || 3000;
const RATE_MAX = Number(process.env.RATE_LIMIT_MAX) || 120;
const RATE_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000;

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
  const rl = checkRateLimit(clientKey(req), RATE_MAX, RATE_WINDOW_MS);
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

  try {
    if (req.method === "GET" && url.pathname === "/health") {
      json(res, 200, { ok: true, requestId });
      return;
    }

    if (req.method === "GET" && url.pathname === "/v1/ideas") {
      const tag = url.searchParams.get("tag") ?? undefined;
      const ideas = listIdeas(tag);
      json(res, 200, { ideas, requestId });
      return;
    }

    const ideaMatch = /^\/v1\/ideas\/([^/]+)$/.exec(url.pathname);
    if (req.method === "GET" && ideaMatch) {
      const idea = getIdea(ideaMatch[1]!);
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
      const idea = createIdea(bodyResult.data, sessionId, idempotencyKey);
      log("info", "idea_created", {
        requestId,
        ideaId: idea.id,
        sessionId,
      });
      json(res, 201, { idea, requestId });
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
      const preferences = patchSessionPreferences(
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

export function createAppServer(): http.Server {
  return http.createServer((req, res) => {
    void handleRequest(req, res);
  });
}

const isMain =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]!).href;
if (isMain) {
  const server = createAppServer();
  server.listen(PORT, () => {
    log("info", "server_listening", { port: PORT });
  });
}
