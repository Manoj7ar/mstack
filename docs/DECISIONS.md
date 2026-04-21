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

---

### 2026-04-20 — Effectiveness and specialist map

**Context:** Users needed **honest** usefulness expectations (bands), explicit **weakness ↔ mitigation** mapping, and guidance to **trim overlapping** specialists without guessing.

**Decision:** Add **`docs/EFFECTIVENESS.md`** (when mstack helps, when not, checklist to maximize value). Add **`docs/SPECIALIST_MAP.md`** (primary vs alternate per domain). Wire README intro, ONBOARDING, AGENT_MEMORY, workflow, POWER_USER, TROUBLESHOOTING, PACKS Custom, AGENTS human docs, README repo layout. Add a **ceremony vs tokens** bullet to **`mstack-token-discipline.mdc`** pointing at mechanical pass and EFFECTIVENESS.

**Consequences:** Slightly more docs to maintain; adopters can self-select packs and reduce overlap with less support churn.

---

### 2026-04-20 — Community wave 6 (contributors + discoverability)

**Context:** Sharing mstack with ambassadors and broader Cursor users needed a **low-friction** path to feedback and PRs, plus **trust signals** (conduct, templates) without adding new specialist rules.

**Decision:** Add **`CONTRIBUTING.md`**, **`CODE_OF_CONDUCT.md`**, **`.github/ISSUE_TEMPLATE/*`**, **`PULL_REQUEST_TEMPLATE.md`**, **`docs/SHOWCASE.md`**, **`docs/FAQ.md`**, **`CHANGELOG.md`**. Polish **README** (badges, mermaid map, contributor links). Point **`AGENTS.md`** and **`mstack-core-workflow.mdc`** at CONTRIBUTING/CHANGELOG.

**Consequences:** More maintainer surface area (templates, changelog entries).

---

### 2026-04-20 — Wave 7: token levers, recap, surgical investigation

**Context:** Users wanted **more useful / efficient** agent behavior without claiming automatic token % or model switching. EFFECTIVENESS already stated measurement limits.

**Decision:** Add **`docs/TOKEN_LEVERS.md`** (honest habits). Add **`templates/AGENT_RECAP_TEMPLATE.md`** and optional **`/mstack-lean-handoff`** skill. Add **`mstack-surgical-investigation.mdc`** to **standard** and **full** packs only (invoke via **@mention**; no `globs` so it is not always attached). Tighten **`mstack-debug.mdc`** with a short hypothesis ladder and minimal-instrumentation guidance. Extend first-message snippets. **No** token benchmark suite.

**Consequences:** Standard pack grows by one optional rule; Lite/Minimal unchanged. Maintainers must keep README/PACKS tables in sync when adding rules.

---

### 2026-04-21 — Cursor product integration (Agent + IDE)

**Context:** Users wanted mstack aligned with **Cursor’s actual surfaces** and clear guidance on when to use **Agent** vs **IDE** tools (Tab, inline edit, debugger, terminal).

**Decision:** Add **`docs/CURSOR_INTEGRATION.md`** (official doc links, mstack mapping, Agent vs IDE table, remote import note). Extend **`docs/CURSOR_LIMITS.md`** (Agent vs Tab/inline, rule precedence Team → Project → User). One-line wiring in **`AGENTS.md`**, **`mstack-core-workflow.mdc`** (IDE-first OK for obvious single-file work), **`mstack-token-discipline.mdc`** (IDE navigation when location known). README / ONBOARDING / CONTRIBUTING / AGENT_MEMORY / workflow quick links. **No** claim that project rules control all IDE AI features.

**Consequences:** Slightly more docs to maintain; reduces confusion between chat rules and editor workflows.

---

### 2026-04-21 — Remove GitHub Actions from this repo

**Context:** Hosted runners were unreliable or unwanted for this maintainers; the pack does not require remote CI.

**Decision:** Delete **`.github/workflows/mstack-ci.yml`** and **`mstack-ci-smoke.yml`**. Keep **`npm run mstack:ci`** / **`scripts/mstack-ci-local.sh`** for local verification and **`mstack-pack-verify.yml.example`** for consumers.

**Consequences:** No automated checks on push/PR in this repository; contributors rely on local `mstack:ci` and PR checklist.

---

### 2026-04-21 — OpenAPI surface and cursor pagination for ideas list

**Context:** The sample API had no machine-readable contract, and `GET /v1/ideas` always returned the full in-memory list.

**Decision:** Serve **`GET /v1/openapi.json`** from `src/openapi.ts` (no extra npm deps). Paginate **`GET /v1/ideas`** with `limit` (default 50, max 100) and opaque **`cursor`** (base64url JSON of last item’s `createdAt` + `id`); response adds optional **`nextCursor`**. Stable ordering: **`createdAt` desc, then `id` desc**. Bump **`API_VERSION`** to **0.3.0**.

**Consequences:** Clients that need every idea must follow `nextCursor` until absent. Tools that only fetch the first page (e.g. `scripts/ideas-snapshot.mjs`) see at most `limit` items unless extended.

---

### 2026-04-21 — Wave 8: adoption kit (starter page + first-sync skill)

**Context:** New users still hit **time-to-first-use** friction (wrong sync path, skipped doctor, unclear first message).

**Decision:** Add **`docs/STARTER_KIT.md`** (single-page sync, verify, links). Add explicit-invocation skill **`/mstack-first-sync`** (`disable-model-invocation: true`) that prints copy-paste commands and points to **`STARTER_KIT`** — **no** new `alwaysApply` rules or pack entries. Add **`templates/MSTACK_DAY_ONE_CHECKLIST.md`**; wire **FAQ**, **SHOWCASE** (optional README blurb), **EFFECTIVENESS**, **ADOPTION_AUDIT**, **core-workflow** artifacts list, README / ONBOARDING / AGENTS / AGENT_MEMORY / workflow / **CURSOR_INTEGRATION** / **PLAYBOOK_FIRST_MESSAGES**.

**Consequences:** More docs to maintain; adoption path is discoverable without growing rule surface area.

---

### 2026-04-21 — Wave 9: post-adoption usefulness (upgrade path, monorepo, recipes, hotfix template)

**Context:** After first sync, teams still struggled with **vendor refreshes**, **monorepo layout**, **picking specialists**, and **hotfix discipline**—without wanting more `alwaysApply` rules.

**Decision:** Add **`docs/VENDOR_UPGRADE.md`** + skill **`/mstack-upgrade-vendor`** (copy-paste only). Add **`docs/MONOREPO.md`** (nested `AGENTS.md`, one `vendor/mstack`, `@` narrowing). Add **`docs/RECIPES.md`** as the task-first index; cross-link **`SPECIALIST_MAP`**. Add **`templates/HOTFIX_OR_ROLLBACK_CHECKLIST.md`** wired in **core-workflow** and first messages—**no** new `mstack-hotfix.mdc` in packs for this slice.

**Consequences:** More docs; **`mstack-core-workflow`** artifact list grows by one template line; pack manifests unchanged.

---

### 2026-04-21 — Wave 10: discovery + team adoption (docs only)

**Context:** Champions needed a **single page** to roll out mstack; many users do not know **remote rule import** vs **vendoring**; **`/mstack-*` skills** were only listed inline in README.

**Decision:** Add **`docs/TEAM_ROLLOUT.md`**, **`docs/RULES_SOURCE.md`**, **`docs/SKILLS.md`**. Extend **FAQ**, **SHOWCASE** (“what counts as adopted”), **CURSOR_INTEGRATION** remote-import row, **ONBOARDING**, and navigation (**README**, **AGENTS**, **AGENT_MEMORY**, **workflow**, **STARTER_KIT**). **No** CI in this repo; **no** new rules or pack files.

**Consequences:** More docs to maintain; clearer paths for teams and for “no submodule” questions.

---

### 2026-04-21 — Wave 11: context budget skill + breaking-change rule (full only)

**Context:** Users needed **explicit chat budgets** for long threads (Cursor does not auto-trim context) and a **consistent posture** for true breaking changes without bloating **standard** pack.

**Decision:** Add **`docs/CONTEXT_BUDGET.md`** + skill **`/mstack-context-budget`** (`disable-model-invocation: true`). Add **`templates/BREAKING_CHANGE_CHECKLIST.md`** and **`mstack-breaking-change.mdc`** (`alwaysApply: false`, **no globs**, manual **`@mstack-breaking-change`**), listed only in **`scripts/packs/full.txt`**. Wire navigation and **RECIPES** / **SPECIALIST_MAP** / **core-workflow**.

**Consequences:** Full pack gains one more `.mdc`; verify-packs must list it in `full.txt` (already required for all shipped rules).

---

### 2026-04-21 — Wave 12: ship-check skill + UI/security lite templates + WHY_MSTACK

**Context:** Visitors wanted **immediate, reusable** pre-PR habits and **scannable** design/security checklists without adding **`alwaysApply`** rules or expanding **standard** pack.

**Decision:** Add skill **`/mstack-ship-check`** (`disable-model-invocation: true`). Add **`templates/UI_ACCEPTANCE_CHECKLIST.md`** and **`templates/SECURITY_REVIEW_LITE.md`**. Add **`docs/WHY_MSTACK.md`** (honest positioning vs raw Agent). Wire **README**, **SKILLS**, **core-workflow**, **RECIPES**, **flight-deck**, **PLAYBOOK_FIRST_MESSAGES**, etc. **No** new rules or **`scripts/packs/*.txt`** edits.

**Consequences:** More templates and one more skill to maintain; clearer entry for GitHub readers.

---

### 2026-04-21 — Wave 13: DOCS_MAP + alternatives note

**Context:** The repo had **many** docs and skills; new visitors did not know **which pages to open first** by role.

**Decision:** Add **`docs/DOCS_MAP.md`** with ordered paths (mobile/browser, first-time, daily, champion, agent maintainer) and a small **mermaid** role diagram. Cross-link **README**, **FAQ** (“too many docs”), **workflow**, **AGENT_MEMORY**, **STARTER_KIT**, **CURSOR_INTEGRATION**, **AGENTS**. Add **Alternatives** to **`WHY_MSTACK.md`**. Extend **EFFECTIVENESS** (lower band mitigation, weaknesses row, checklist step 0, See also). **No** new rules or **`scripts/packs`** edits.

**Consequences:** One more doc to maintain when adding major new pages; improves wayfinding without new Cursor features.

---

### 2026-04-21 — Cursor base behavior doc + agent-habits skill

**Context:** A sibling repo collects **verbatim** Cursor system prompt snapshots. Teams asked how that relates to mstack without **vendoring** huge, fast-stale prompt text into the pack.

**Decision:** Add **`docs/CURSOR_BASE_BEHAVIOR.md`** (paraphrased layering, Chat vs Agent table, distilled habits, link to research only) and skill **`/mstack-agent-habits`** (`disable-model-invocation: true`) for a pasteable kickoff. Wire **CURSOR_INTEGRATION**, **CURSOR_LIMITS**, **SKILLS**, **DOCS_MAP**, **RECIPES**, **AGENTS**, **AGENT_MEMORY**, **PLAYBOOK_FIRST_MESSAGES**, **FAQ**, **README**, **workflow**, **flight-deck** skill. **No** new `.mdc` rules or **`scripts/packs`** edits.

**Consequences:** One more doc and skill to maintain; clearer mental model of **product base + project rules** without duplicating Cursor’s internal prompts.

---

### 2026-04-21 — Wave 14: CURSOR_MCP + GLOSSARY + ANTI_PATTERNS

**Context:** Adopters use **MCP** with Agent but had no mstack-aligned note on trust boundaries; **terminology** (pack vs skill vs `@mention`) scattered across docs; **failure modes** were mostly reactive in TROUBLESHOOTING.

**Decision:** Add **`docs/CURSOR_MCP.md`** (stack diagram, safety with **`mstack-permissions`** / **`mstack-secrets-env`**, when to use vs YAGNI), **`docs/GLOSSARY.md`**, **`docs/ANTI_PATTERNS.md`**. Cross-link **DOCS_MAP**, **RECIPES**, **EFFECTIVENESS**, **TROUBLESHOOTING**, **CURSOR_INTEGRATION**, **CURSOR_LIMITS**, **STARTER_KIT**, **README**, **workflow**, **AGENT_MEMORY**, **AGENTS**, **PLAYBOOK_FIRST_MESSAGES**, **SKILLS**, **FAQ**, **WHY_MSTACK**. **No** new `.mdc` rules or **`scripts/packs`** edits.

**Consequences:** Three more docs to maintain when Cursor MCP UX changes; less Slack repetition for jargon and MCP safety.
