# Architecture decisions (lightweight)

Short **decision log** so future agents and humans know *why* things are shaped this way. Add a new entry when you change durable behavior, public API, or repo layout.

## Format

```text
### YYYY-MM-DD — Title
**Context:** …
**Decision:** …
**Consequences:** …
```

---

### 2026-04-20 — mstack + sample API in one repo

**Context:** The repository ships a Cursor workflow pack; a small HTTP service was added to demonstrate hardened API patterns.

**Decision:** Keep **one `README.md`** (canonical, uppercase) with mstack install docs first and an **Ideas API** section second. Remove duplicate lowercase `readme.md` to avoid case conflicts on cross-platform checkouts.

**Consequences:** Consumers copying only rules still see API sections unless they delete `src/`; they can ignore or delete the service files.

---

### 2026-04-20 — In-memory store

**Context:** No database is configured for the sample service.

**Decision:** Use `Map` in `src/store.ts` for ideas, sessions, and idempotency keys.

**Consequences:** Restart loses data; suitable for demos and tests, not production persistence.

---

### 2026-04-20 — Agent-oriented documentation

**Context:** Agents need stable pointers for “how everything works” without re-deriving from code each session.

**Decision:** Maintain `docs/AGENT_MEMORY.md`, `docs/ARCHITECTURE.md`, and this file; add `.cursor/rules/mstack-repo-memory.mdc` to steer agents to them.

**Consequences:** Doc drift is possible; **update these docs when code changes materially**.

---

### 2026-04-20 — PATCH idea: merge session default tags

**Context:** Creating ideas merges `defaultTags` with body tags; updates should stay consistent.

**Decision:** When a PATCH includes `tags`, the stored tag set is `unique(defaultTags ∪ patch.tags)` for that session (session from `X-Session-ID`, else `"anonymous"` prefs).

**Consequences:** Clients cannot remove a default tag via PATCH without changing session preferences first.

---

### 2026-04-20 — Metadata, update, and delete for ideas

**Context:** The sample API needed discoverable version info and full CRUD-style ergonomics for demos and agents.

**Decision:** Add `GET /v1/meta` (service name, `API_VERSION` in `src/version.ts`, Node version). Add `PATCH /v1/ideas/:id` with Zod-validated partial body and `DELETE /v1/ideas/:id` (204, empty body). Ideas gain `updatedAt`; DELETE removes matching idempotency map entries.

**Consequences:** Clients can probe compatibility via `/v1/meta`; in-memory idempotency keys do not resurrect deleted ideas.
