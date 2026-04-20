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

---

### 2026-04-20 — Cursor Canvas flight-deck skill

**Context:** Cursor 3.1+ supports durable interactive [Canvases](https://cursor.com/docs/agent/tools/canvas); this repo benefits from a repeatable layout for onboarding and API visibility.

**Decision:** Add project skill **`.cursor/skills/mstack-flight-deck`** with `disable-model-invocation: true` so users invoke **`/mstack-flight-deck`** explicitly. Add **`scripts/ideas-snapshot.mjs`** (no extra deps) for `GET /v1/meta` and `GET /v1/ideas` JSON. Extend **`scripts/sync-mstack.sh`** to copy **`.cursor/skills`** when vendoring.

**Consequences:** Canvas content is produced in the IDE by the agent; the skill and script are versioned here. Adopters who omit `src/` can delete the skill or leave it (harmless if API not run).

---

### 2026-04-20 — Docs expansion and GStack-parity navigation

**Context:** Adopters asked for clearer onboarding, a single “playbook” for sprints, troubleshooting, and an explicit mapping to GStack-style *roles* without copying GStack prompts.

**Decision:** Add `docs/ONBOARDING.md`, `PLAYBOOK.md`, `GSTACK_INSPIRATION.md`, `TROUBLESHOOTING.md`; add templates `PRODUCT_REVIEW_TEMPLATE.md`, `DOC_TASK_TEMPLATE.md`, `RISK_REGISTER_TEMPLATE.md`; add rules `mstack-product-review.mdc` and `mstack-documentation-pass.mdc`. Wire `AGENTS.md`, `workflow.md`, `PACKS.md` (Custom), README, flight-deck skill, and `mstack-core-workflow.mdc` artifacts.

**Consequences:** More files to maintain; flight-deck reads a few extra doc headings (bounded). No vendored GStack content.

---

### 2026-04-20 — Pack manifests and `MSTACK_PACK`

**Context:** Copying every `mstack-*.mdc` forced adopters to delete files manually to match [PACKS.md](PACKS.md).

**Decision:** Add **`scripts/packs/{minimal,lite,standard,full}.txt`** (newline-separated rule basenames). Extend **`scripts/sync-mstack.sh`** with **`MSTACK_PACK`** (`minimal` | `lite` | `standard` | `full` | **`all`**). Default **`all`** preserves previous “copy all rules” behavior. Add **`SYNC_TEMPLATES`** and **`INIT_PROJECT_MEMORY`** for optional template skip and `docs/PROJECT_MEMORY.md` bootstrap.

**Consequences:** PACKS.md and onboarding point to the `.txt` files as source of truth for automation; adopters can sync a curated subset in one command.

---

### 2026-04-20 — Verify script, session brief, mechanical pass

**Context:** Power users wanted **provable** vendored rule sets, **file-based** chat handoffs, and an explicit **turbo** path without bloating minimal/lite packs.

**Decision:** Add **`scripts/verify-mstack-sync.sh`** (`--strict` flags extra rules). Prefer root **`SESSION_BRIEF.md`** via **`templates/SESSION_BRIEF_TEMPLATE.md`** in **`mstack-session-handoff.mdc`**. Add **`mstack-mechanical-pass.mdc`** only to **standard** and **full** pack manifests.

**Consequences:** CI can gate drift; session handoffs are copy-paste optional; mechanical work has a documented escape hatch that still respects token discipline and permissions.

---

### 2026-04-20 — Doctor, adoption audit, solo pack, CI example

**Context:** Adopters needed **one-command** local checks, a **repeatable** onboarding checklist, optional **CI** recipe, faster **chat bootstraps**, and a **solo** pack between Lite and Standard.

**Decision:** Add **`scripts/mstack-doctor.sh`** (required trio + optional `verify-mstack-sync` via `MSTACK_PACK` / `MSTACK_ROOT` / `MSTACK_VERIFY_STRICT`), **`scripts/verify-packs-internal.sh`** for manifest typos in this repo, **`docs/ADOPTION_AUDIT.md`**, **`mstack-adoption-audit.mdc`** (in **full** pack only), **`docs/PLAYBOOK_FIRST_MESSAGES.md`**, **`.cursor/skills/mstack-doctor`**, **`scripts/packs/solo.txt`**, and **`.github/workflows/mstack-pack-verify.yml.example`**. Wire **`npm run mstack:doctor`** and **`mstack:verify-packs`**.

**Consequences:** Teams can gate drift in CI; solo devs get a 7-rule preset; subjective “usefulness scores” still depend on human discipline—tooling only reduces silent misconfiguration.

---

### 2026-04-20 — Wave 4: secrets-env, i18n, release checklist, pack-picker

**Context:** Teams needed explicit **env/CI secret** posture beyond generic security review; localized products needed a **catalog-focused** rule; release owners wanted a single **checklist**; adopters asked “which pack?” interactively.

**Decision:** Add **`mstack-secrets-env.mdc`** + **`templates/SECRETS_AND_ENV_CHECKLIST.md`** to **standard** and **full** packs. Add **`mstack-i18n-localization.mdc`** + **`templates/LOCALIZATION_QA_TEMPLATE.md`** to **full** only. Add **`templates/RELEASE_OWNER_CHECKLIST.md`** (no new rule). Add skill **`.cursor/skills/mstack-pack-picker`** (`/mstack-pack-picker`). Wire **`mstack-core-workflow.mdc`**, README, PACKS, workflow, AGENTS.

**Consequences:** Standard grows by one specialist (secrets-env); full adds i18n; consumers sync three new templates via existing `sync-mstack.sh` behavior.

---

### 2026-04-20 — Wave 5: privacy, feature flags, OSS license hygiene

**Context:** Security and secrets rules did not cover **product privacy posture**, **flag rollouts**, or **LICENSE/NOTICE** maintenance.

**Decision:** Add **`mstack-privacy-data-handling.mdc`** + **`PRIVACY_IMPACT_LITE.md`** (**full** only). Add **`mstack-feature-flags.mdc`** + **`FEATURE_FLAG_CHANGE_CHECKLIST.md`** (**standard** + **full**). Add **`mstack-open-source-license.mdc`** + **`LICENSE_HYGIENE_CHECKLIST.md`** (**full** only). All disclaim **not legal advice**.

**Consequences:** Three new specialists and templates; `verify-packs-internal` enforces manifest ↔ file presence.
