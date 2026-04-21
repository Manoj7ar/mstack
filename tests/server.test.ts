import http from "node:http";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeAll, afterAll, describe, expect, it } from "vitest";
import {
  createAppServer,
  resetRateLimitState,
} from "../src/server.js";
import { FileIdeasStore } from "../src/store.js";
import { SERVICE_NAME, REPO_PRODUCT_NAME } from "../src/version.js";

function listen(server: http.Server): Promise<{ port: number }> {
  return new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (addr && typeof addr === "object") {
        resolve({ port: addr.port });
      } else {
        reject(new Error("No port"));
      }
    });
    server.on("error", reject);
  });
}

describe("Ideas API", () => {
  let server: http.Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createAppServer();
    const { port } = await listen(server);
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  afterEach(() => {
    resetRateLimitState();
  });

  it("GET /health returns ok", async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean; requestId: string };
    expect(body.ok).toBe(true);
    expect(body.requestId).toBeDefined();
    expect(res.headers.get("x-request-id")).toBe(body.requestId);
  });

  it("POST /v1/ideas validates body", async () => {
    const res = await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" }),
    });
    expect(res.status).toBe(422);
  });

  it("POST /v1/ideas rejects invalid JSON", async () => {
    const res = await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ not json",
    });
    expect(res.status).toBe(400);
    const j = (await res.json()) as { error: string };
    expect(j.error).toBe("invalid_json");
  });

  it("applies session default tags and idempotency replay", async () => {
    const session = "test-session-1";
    const pref = await fetch(`${baseUrl}/v1/session/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
      },
      body: JSON.stringify({ defaultTags: ["backlog"] }),
    });
    expect(pref.status).toBe(200);

    const idem = "idem-key-1";
    const body = { title: "  My idea  ", tags: ["feature"] };
    const r1 = await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
        "Idempotency-Key": idem,
      },
      body: JSON.stringify(body),
    });
    expect(r1.status).toBe(201);
    const j1 = (await r1.json()) as { idea: { id: string; tags: string[] } };
    expect(j1.idea.tags).toEqual(expect.arrayContaining(["backlog", "feature"]));

    const r2 = await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
        "Idempotency-Key": idem,
      },
      body: JSON.stringify(body),
    });
    expect(r2.status).toBe(201);
    const j2 = (await r2.json()) as { idea: { id: string } };
    expect(j2.idea.id).toBe(j1.idea.id);
  });

  it("returns 409 when Idempotency-Key reused with different body", async () => {
    const session = "test-session-idem-conflict";
    const idem = "idem-conflict-key";
    const r1 = await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
        "Idempotency-Key": idem,
      },
      body: JSON.stringify({ title: "First", tags: [] }),
    });
    expect(r1.status).toBe(201);

    const r2 = await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
        "Idempotency-Key": idem,
      },
      body: JSON.stringify({ title: "Second", tags: [] }),
    });
    expect(r2.status).toBe(409);
    const j = (await r2.json()) as { error: string };
    expect(j.error).toBe("idempotency_conflict");
  });

  it("lists ideas filtered by tag", async () => {
    const session = "test-session-2";
    await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
      },
      body: JSON.stringify({ title: "Tagged", tags: ["alpha"] }),
    });
    const list = await fetch(`${baseUrl}/v1/ideas?tag=alpha`);
    expect(list.status).toBe(200);
    const data = (await list.json()) as { ideas: { title: string }[] };
    expect(data.ideas.some((i) => i.title === "Tagged")).toBe(true);
  });

  it("GET /v1/openapi.json returns OpenAPI document", async () => {
    const res = await fetch(`${baseUrl}/v1/openapi.json`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    const doc = (await res.json()) as {
      openapi: string;
      paths: Record<string, unknown>;
    };
    expect(doc.openapi).toBe("3.0.3");
    expect(doc.paths["/health"]).toBeDefined();
    expect(doc.paths["/v1/ideas"]).toBeDefined();
    expect(doc.paths["/v1/openapi.json"]).toBeDefined();
  });

  it("GET /v1/ideas paginates with cursor and tag filter", async () => {
    const session = "test-session-pagination";
    const tag = `paginate-${Date.now()}`;
    for (let i = 0; i < 3; i++) {
      const r = await fetch(`${baseUrl}/v1/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": session,
        },
        body: JSON.stringify({ title: `Page idea ${i}`, tags: [tag] }),
      });
      expect(r.status).toBe(201);
    }
    const p1 = await fetch(
      `${baseUrl}/v1/ideas?tag=${encodeURIComponent(tag)}&limit=2`,
    );
    expect(p1.status).toBe(200);
    const j1 = (await p1.json()) as {
      ideas: { title: string }[];
      nextCursor?: string;
      requestId: string;
    };
    expect(j1.ideas).toHaveLength(2);
    expect(j1.nextCursor).toBeDefined();

    const p2 = await fetch(
      `${baseUrl}/v1/ideas?tag=${encodeURIComponent(tag)}&limit=2&cursor=${encodeURIComponent(j1.nextCursor!)}`,
    );
    expect(p2.status).toBe(200);
    const j2 = (await p2.json()) as {
      ideas: { title: string }[];
      nextCursor?: string;
    };
    expect(j2.ideas).toHaveLength(1);
    expect(j2.nextCursor).toBeUndefined();
  });

  it("GET /v1/ideas accepts limit at max 100", async () => {
    const res = await fetch(`${baseUrl}/v1/ideas?limit=100`);
    expect(res.status).toBe(200);
  });

  it("GET /v1/ideas empty list has no nextCursor", async () => {
    const tag = `empty-${Date.now()}-none`;
    const res = await fetch(`${baseUrl}/v1/ideas?tag=${encodeURIComponent(tag)}`);
    expect(res.status).toBe(200);
    const j = (await res.json()) as {
      ideas: unknown[];
      nextCursor?: string;
    };
    expect(j.ideas).toEqual([]);
    expect(j.nextCursor).toBeUndefined();
  });

  it("GET /v1/ideas rejects invalid limit and cursor", async () => {
    const badLimit = await fetch(`${baseUrl}/v1/ideas?limit=0`);
    expect(badLimit.status).toBe(400);
    const limBody = (await badLimit.json()) as { error: string };
    expect(limBody.error).toBe("invalid_limit");

    const badCursor = await fetch(`${baseUrl}/v1/ideas?cursor=%%%`);
    expect(badCursor.status).toBe(400);
    const curBody = (await badCursor.json()) as { error: string };
    expect(curBody.error).toBe("invalid_cursor");
  });

  it("GET /v1/meta returns service metadata", async () => {
    const res = await fetch(`${baseUrl}/v1/meta`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      product: string;
      service: string;
      apiVersion: string;
      node: string;
    };
    expect(body.product).toBe(REPO_PRODUCT_NAME);
    expect(body.service).toBe(SERVICE_NAME);
    expect(body.apiVersion).toMatch(/^\d+\.\d+\.\d+$/);
    expect(body.node).toMatch(/^v/);
  });

  it("GET /v1/ideas/:id returns 404 for unknown id", async () => {
    const res = await fetch(
      `${baseUrl}/v1/ideas/00000000-0000-0000-0000-000000000000`,
    );
    expect(res.status).toBe(404);
    const j = (await res.json()) as { error: string };
    expect(j.error).toBe("not_found");
  });

  it("PATCH /v1/ideas/:id rejects empty patch object", async () => {
    const session = "test-patch-empty";
    const create = await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
      },
      body: JSON.stringify({ title: "For patch test", tags: [] }),
    });
    expect(create.status).toBe(201);
    const { idea } = (await create.json()) as { idea: { id: string } };
    const patch = await fetch(`${baseUrl}/v1/ideas/${idea.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
      },
      body: JSON.stringify({}),
    });
    expect(patch.status).toBe(422);
  });

  it("PATCH and DELETE /v1/ideas/:id", async () => {
    const session = "test-session-3";
    await fetch(`${baseUrl}/v1/session/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
      },
      body: JSON.stringify({ defaultTags: ["defaulted"] }),
    });
    const create = await fetch(`${baseUrl}/v1/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
      },
      body: JSON.stringify({ title: "Original", tags: ["x"] }),
    });
    const created = (await create.json()) as {
      idea: { id: string; updatedAt: string };
    };
    const id = created.idea.id;
    const before = created.idea.updatedAt;

    const patch = await fetch(`${baseUrl}/v1/ideas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": session,
      },
      body: JSON.stringify({ tags: ["y"] }),
    });
    expect(patch.status).toBe(200);
    const patched = (await patch.json()) as {
      idea: { tags: string[]; updatedAt: string };
    };
    expect(patched.idea.tags).toEqual(
      expect.arrayContaining(["defaulted", "y"]),
    );
    expect(patched.idea.updatedAt >= before).toBe(true);

    const del = await fetch(`${baseUrl}/v1/ideas/${id}`, { method: "DELETE" });
    expect(del.status).toBe(204);
    const get = await fetch(`${baseUrl}/v1/ideas/${id}`);
    expect(get.status).toBe(404);
  });

  it("returns 429 when rate limited", async () => {
    const rlServer = createAppServer({
      rateLimitMax: 2,
      rateLimitWindowMs: 60_000,
    });
    const { port } = await listen(rlServer);
    const rlBase = `http://127.0.0.1:${port}`;
    try {
      const h1 = await fetch(`${rlBase}/health`);
      const h2 = await fetch(`${rlBase}/health`);
      const h3 = await fetch(`${rlBase}/health`);
      expect(h1.status).toBe(200);
      expect(h2.status).toBe(200);
      expect(h3.status).toBe(429);
      const j = (await h3.json()) as { error: string };
      expect(j.error).toBe("rate_limited");
    } finally {
      await new Promise<void>((resolve) => rlServer.close(() => resolve()));
    }
  });
});

describe("Ideas API file-backed store", () => {
  let tmpDir: string;
  let storePath: string;

  beforeAll(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "mstack-ideas-"));
    storePath = join(tmpDir, "store.json");
  });

  afterAll(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("persists ideas across server restart", async () => {
    const store1 = new FileIdeasStore(storePath);
    const server1 = createAppServer({ store: store1 });
    const { port: p1 } = await listen(server1);
    const base1 = `http://127.0.0.1:${p1}`;
    const r1 = await fetch(`${base1}/v1/ideas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Persist me", tags: ["file"] }),
    });
    expect(r1.status).toBe(201);
    const j1 = (await r1.json()) as { idea: { id: string } };
    expect(readFileSync(storePath, "utf8")).toContain(j1.idea.id);
    await new Promise<void>((resolve) => server1.close(() => resolve()));

    const store2 = new FileIdeasStore(storePath);
    const server2 = createAppServer({ store: store2 });
    const { port: p2 } = await listen(server2);
    const base2 = `http://127.0.0.1:${p2}`;
    try {
      const get = await fetch(`${base2}/v1/ideas/${j1.idea.id}`);
      expect(get.status).toBe(200);
    } finally {
      await new Promise<void>((resolve) => server2.close(() => resolve()));
    }
  });
});
