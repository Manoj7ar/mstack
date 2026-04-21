#!/usr/bin/env node
/**
 * Fetch Ideas API /v1/meta and /v1/ideas; print one JSON line to stdout.
 * Always exits 0 with parseable JSON (ok:false on failure).
 * Note: GET /v1/ideas is paginated; this script only requests the first page
 * (default limit). For a full dump, loop with ?cursor= from each nextCursor.
 * Usage: IDEAS_API_BASE=http://127.0.0.1:3000 node scripts/ideas-snapshot.mjs
 */
const base = (process.env.IDEAS_API_BASE || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);

async function getJson(path) {
  const url = `${base}${path}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: "application/json" },
    });
    const text = await res.text();
    let data;
    try {
      data = text.length ? JSON.parse(text) : null;
    } catch {
      data = { raw: text.slice(0, 500) };
    }
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, status: 0, error: msg };
  } finally {
    clearTimeout(t);
  }
}

const out = { ok: false, base };

const metaRes = await getJson("/v1/meta");
if (!metaRes.ok || !metaRes.data || typeof metaRes.data !== "object") {
  out.error =
    metaRes.error ||
    (metaRes.ok === false && metaRes.status
      ? `GET /v1/meta HTTP ${metaRes.status}`
      : "GET /v1/meta failed");
  console.log(JSON.stringify(out));
  process.exit(0);
}

const meta = metaRes.data;
out.meta = {
  product: meta.product,
  service: meta.service,
  apiVersion: meta.apiVersion,
  node: meta.node,
};

const ideasRes = await getJson("/v1/ideas");
if (!ideasRes.ok || !ideasRes.data || typeof ideasRes.data !== "object") {
  out.error =
    ideasRes.error ||
    (ideasRes.status ? `GET /v1/ideas HTTP ${ideasRes.status}` : "GET /v1/ideas failed");
  out.ok = false;
  console.log(JSON.stringify(out));
  process.exit(0);
}

const ideasPayload = ideasRes.data;
const ideas = Array.isArray(ideasPayload.ideas) ? ideasPayload.ideas : [];

out.ok = true;
out.ideas = ideas.map((i) => ({
  id: i.id,
  title: i.title,
  tags: i.tags,
  updatedAt: i.updatedAt,
  createdAt: i.createdAt,
}));

console.log(JSON.stringify(out));
process.exit(0);
