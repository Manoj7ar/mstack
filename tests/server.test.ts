import http from "node:http";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAppServer } from "../src/server.js";

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

  it("applies session default tags and idempotency", async () => {
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
      body: JSON.stringify({ title: "different", tags: [] }),
    });
    expect(r2.status).toBe(201);
    const j2 = (await r2.json()) as { idea: { id: string } };
    expect(j2.idea.id).toBe(j1.idea.id);
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

  it("GET /v1/meta returns service metadata", async () => {
    const res = await fetch(`${baseUrl}/v1/meta`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      service: string;
      apiVersion: string;
      node: string;
    };
    expect(body.service).toBe("ideas-api");
    expect(body.apiVersion).toMatch(/^\d+\.\d+\.\d+$/);
    expect(body.node).toMatch(/^v/);
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
});
