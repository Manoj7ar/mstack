# mstack

**mstack** is a **Markdown-first Cursor Agent workflow pack**: phase-separated work, token discipline, permission gates, and specialist rules you can **copy into any codebase**. It ships as `.cursor/rules/*.mdc`, root **`AGENTS.md`**, and **`templates/`**.

This repository is also a **reference implementation**: it includes **`docs/`** for agent-oriented memory and an optional **Ideas HTTP API** (`src/`, `tests/`) that exercises structured API patterns.

Inspired by the “virtual team” workflow idea popularized by [GStack](https://github.com/garrytan/gstack) (Claude Code). **mstack is independent** content for Cursor; it is not a fork of GStack.

---

## What you get

| Area | What it does |
| ---- | ------------ |
| **Phases** | Think → Plan → Build → Review → Test → Ship → Reflect, with explicit handoffs (`mstack-core-workflow.mdc`). |
| **Token discipline** | Search-first, bounded reads, summary-before-edit (`mstack-token-discipline.mdc`). |
| **Destructive actions** | Confirm before `git reset --hard`, force push, broad deletes, DB drops, prod changes (`mstack-permissions.mdc`). |
| **Cursor Plan Mode** | Multi-step planning before code; aligns with `templates/PLAN_TEMPLATE.md` ([docs](https://cursor.com/docs/agent/plan-mode)). |
| **Cursor Debug Mode** | Runtime hypotheses and instrumentation; mstack adds **consent** before invasive logging ([docs](https://cursor.com/docs/agent/debug-mode)). |
| **Model strategy** | Advisory tier hints (lighter vs stronger) and token tips in chat—**rules cannot switch your model** (`mstack-model-strategy.mdc`). |
| **Design research** | Optional web inspiration **only with your permission** (`mstack-design-research.mdc`). |
| **Specialists** | Scoped rules for frontend, backend, a11y, data, CI, docs, security, review, dependencies, web perf, AI product, API contracts, observability, releases, session handoff, and more (see table below). |
| **Templates** | Plan, tests, PRs, ADRs, postmortems, debug sessions, reflect, model notes, OpenAPI delta, runbook (see list below). |
| **Rule packs** | Minimal / standard / full copy lists: **[docs/PACKS.md](docs/PACKS.md)**. |

---

## Workflow at a glance

| Phase | Purpose | Typical artifact |
| ----- | ------- | ---------------- |
| **Think** | Goal, constraints, assumptions; optional **Model note** for non-trivial work | — |
| **Plan** | Architecture, risks, files to touch; use **Cursor Plan Mode** when scope is large or unclear | `templates/PLAN_TEMPLATE.md` |
| **Build** | Minimal diff; match repo conventions | — |
| **Review** | Adversarial pass; no new features | `@mstack-review` |
| **Test** | Proportionate coverage | `templates/TEST_PLAN_TEMPLATE.md` |
| **Ship** | Lint/tests, migrations, docs, PR readiness | `templates/PR_CHECKLIST_TEMPLATE.md`, ADR if needed |
| **Reflect** | What worked; what to automate | `templates/REFLECT_TEMPLATE.md` |

Human-readable detail: **[docs/workflow.md](docs/workflow.md)**. Preset rule bundles: **[docs/PACKS.md](docs/PACKS.md)**.

---

## Rules reference (`.cursor/rules/`)

Rules use YAML frontmatter (`description`, `globs`, `alwaysApply`). See [Cursor Rules](https://cursor.com/docs/rules). You can **@mention** a rule in chat (e.g. `@mstack-debug`, `@mstack-model-strategy`).

| File | Always / scoped | Role |
| ---- | --------------- | ---- |
| `mstack-core-workflow.mdc` | Always | Phase machine, handoffs, optional invocations, artifact index. |
| `mstack-token-discipline.mdc` | Always | Bounded exploration; applies during Plan/Debug/review too. |
| `mstack-permissions.mdc` | Always | Gate destructive git, filesystem, DB, production operations. |
| `mstack-frontend.mdc` | Globbed UI files | Components, layout, performance, UI quality. |
| `mstack-accessibility.mdc` | Globbed UI files | Semantics, keyboard, focus, forms, motion, contrast. |
| `mstack-design-research.mdc` | Globbed UI + pages | Moodboard-style research; **web only if user permits**. |
| `mstack-backend.mdc` | API / server paths | Validation, errors, idempotency, logging. |
| `mstack-data-modeling.mdc` | Schema, SQL, ORM, migrations | Safe schema evolution, rollout, nullability. |
| `mstack-data-migrations.mdc` | Migration folders | Narrow migration safety (pairs with data modeling). |
| `mstack-testing-qa.mdc` | Tests / e2e dirs | Pyramid, repro, flakiness, reporting. |
| `mstack-review.mdc` | Common source globs | PR/code review posture; no implementation creep. |
| `mstack-ci-quality.mdc` | Workflows, eslint/tsconfig/biome | CI ordering, determinism, secrets in CI. |
| `mstack-ci.mdc` | Workflow YAML | Targeted pipeline fixes without disabling checks. |
| `mstack-docs-devx.mdc` | README, docs, GitHub templates | Contributor-facing accuracy, less sprawl. |
| `mstack-docs-ship.mdc` | README, docs, CHANGELOG | Ship-oriented doc and changelog touchpoints. |
| `mstack-dependencies.mdc` | Manifests + lockfiles | Intentional bumps, lockfile hygiene, supply-chain mindset. |
| `mstack-security-review.mdc` | Auth, API, server, webhooks | Lightweight STRIDE/OWASP-style pass at boundaries. |
| `mstack-debug.mdc` | On demand / mention | Cursor Debug Mode alignment; **consent** for instrumentation. |
| `mstack-model-strategy.mdc` | On demand / mention | Task taxonomy; lighter vs stronger tier **suggestions** only. |
| `mstack-session-handoff.mdc` | On demand / mention | Fresh chat or parallel agents; minimal briefing and plan path. |
| `mstack-web-performance.mdc` | UI + bundler globs | Core Web Vitals mindset, lazy loading, fonts, CLS. |
| `mstack-ai-product.mdc` | AI / LLM / RAG paths | Prompt injection awareness, tools, PII minimization, streaming UX. |
| `mstack-api-contracts.mdc` | API / OpenAPI / routes | Versioning, error consistency, spec deltas. |
| `mstack-observability.mdc` | API, server, tracing paths | Structured logs, traces, metrics, correlation IDs. |
| `mstack-release-versioning.mdc` | CHANGELOG, release CI, manifests | Semver, changelog, tags. |
| `mstack-repo-memory.mdc` | `docs/`, `src/`, `tests/`, `AGENTS.md`, `README` in **this** repo | Points agents at `docs/AGENT_MEMORY.md`, `ARCHITECTURE.md`, `DECISIONS.md`. |

**Overlapping specialists:** Some pairs cover similar areas with different scope—for example `mstack-docs-devx` vs `mstack-docs-ship`, `mstack-data-modeling` vs `mstack-data-migrations`, `mstack-ci-quality` vs `mstack-ci`. Keep both or delete one set when vendoring into a smaller project.

**Recommended minimum when copying elsewhere:** `mstack-core-workflow`, `mstack-token-discipline`, `mstack-permissions`.

---

## Templates (`templates/`)

| Template | Use |
| -------- | --- |
| `PLAN_TEMPLATE.md` | Plan phase; align with Cursor Plan Mode output. |
| `TEST_PLAN_TEMPLATE.md` | QA and test design. |
| `DESIGN_BRIEF_TEMPLATE.md` | UI/UX before build. |
| `DEBUG_SESSION_TEMPLATE.md` | Repro, hypotheses, **permission** for invasive debug. |
| `REFLECT_TEMPLATE.md` | Reflect phase after non-trivial work. |
| `POSTMORTEM_TEMPLATE.md` | Incident write-up. |
| `INCIDENT_POSTMORTEM_TEMPLATE.md` | Alternate postmortem structure. |
| `PR_CHECKLIST_TEMPLATE.md` | Scope, risk, tests, rollback before merge. |
| `ADR_TEMPLATE.md` | Architecture decision records. |
| `MODEL_STRATEGY_NOTE_TEMPLATE.md` | Longer model/tier/token session notes (advisory). |
| `OPENAPI_DELTA_TEMPLATE.md` | Summarize API or OpenAPI changes for PRs or releases. |
| `RUNBOOK_TEMPLATE.md` | Deploy, health checks, rollback, on-call. |

---

## Cursor integration (modes and permissions)

- **Modes:** Use the Agent **mode picker** or **Shift+Tab** to switch **Agent**, **Plan**, and **Debug** modes ([Plan](https://cursor.com/docs/agent/plan-mode), [Debug](https://cursor.com/docs/agent/debug-mode)).
- **Plan Mode:** Best for unclear requirements or many files; refine the plan before Build.
- **Debug Mode:** Best for runtime evidence; mstack still requires **your OK** before extra logging or reproduce-for-logs steps (`mstack-debug.mdc`).
- **Model picker / Auto:** mstack may suggest a **faster vs more capable** tier in chat; **only you** can change the model—project rules cannot.
- **Web:** No external fetches for design research unless you **explicitly allow** it for that task.

---

## Quick start (consume mstack in another repo)

1. Copy **`AGENTS.md`**, **`.cursor/rules/mstack-*.mdc`**, and optionally **`templates/`** into your project.
2. Merge **`AGENTS.md`** with your existing file if needed.
3. In Cursor, rules load from **`.cursor/rules/`** and **`AGENTS.md`** per [Cursor Rules](https://cursor.com/docs/rules).
4. Say: *Use mstack phases* or step through **Think → Plan → Build**.

### Copy install

```bash
# In your app repo root
cp /path/to/mstack/AGENTS.md .
mkdir -p .cursor/rules templates
cp /path/to/mstack/.cursor/rules/mstack-*.mdc .cursor/rules/
cp -r /path/to/mstack/templates/* templates/
```

### Git submodule

```bash
git submodule add <this-repo-url> vendor/mstack
mkdir -p .cursor/rules
ln -sf ../../vendor/mstack/.cursor/rules/mstack-*.mdc .cursor/rules/
cp vendor/mstack/AGENTS.md ./AGENTS.md.mstack-snippet   # merge manually into your AGENTS.md
```

Re-init after clone: `git submodule update --init --recursive`.

### Sync script

From your app repo with mstack at `vendor/mstack`:

```bash
chmod +x vendor/mstack/scripts/sync-mstack.sh
MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/sync-mstack.sh
```

Copies all **`mstack-*.mdc`** and **`templates/*.md`**. With **`SYNC_AGENTS_SNIPPET=1`**, also writes **`AGENTS.md.mstack-snippet`** for manual merge.

### Subset of rules

Remove any specialist you do not need. For curated lists (**minimal**, **standard**, **full**), see **[docs/PACKS.md](docs/PACKS.md)**. At minimum, keep **`mstack-core-workflow.mdc`**, **`mstack-token-discipline.mdc`**, and **`mstack-permissions.mdc`**.

---

## Working in *this* repository

When you change the **Ideas API**, routes, env vars, or layout, update:

- **[docs/AGENT_MEMORY.md](docs/AGENT_MEMORY.md)** — orientation and glossary  
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — system map  
- **[docs/DECISIONS.md](docs/DECISIONS.md)** — decision log  

Rule **`mstack-repo-memory.mdc`** reminds agents to use these when editing `docs/`, `src/`, or `tests/` here.

---

## Repo layout

```text
AGENTS.md
LICENSE
README.md
.cursor/rules/mstack-*.mdc
docs/
  workflow.md
  PACKS.md
  AGENT_MEMORY.md
  ARCHITECTURE.md
  DECISIONS.md
scripts/sync-mstack.sh
templates/*.md
package.json          # Ideas API
src/                  # Ideas API
tests/                # Ideas API
```

---

## Ideas HTTP API (demo service in this repo)

A small **Node/TypeScript** HTTP service: validation, session preferences, idempotency, rate limits. Data is **in-memory**; restart clears it.

### Run

```bash
npm install
npm run dev
```

Default port **`3000`** (`PORT`). Optional: **`RATE_LIMIT_MAX`**, **`RATE_LIMIT_WINDOW_MS`**.

### Endpoints

| Method | Path | Notes |
| ------ | ---- | ----- |
| `GET` | `/health` | Liveness |
| `GET` | `/v1/meta` | Service name, API version, Node version |
| `GET` | `/v1/ideas?tag=` | List ideas; optional tag filter |
| `GET` | `/v1/ideas/:id` | Single idea |
| `POST` | `/v1/ideas` | Create (`title`, optional `summary`, `tags`). Headers: optional `X-Session-ID`, optional `Idempotency-Key` |
| `PATCH` | `/v1/ideas/:id` | Partial update; optional `X-Session-ID` merges session default tags when `tags` sent |
| `DELETE` | `/v1/ideas/:id` | Remove idea |
| `PATCH` | `/v1/session/preferences` | Header **`X-Session-ID`** (required). Body: optional `defaultTags`, `summarizeTitles` |

Responses include **`X-Request-ID`** and JSON **`requestId`**.

### Test / build

```bash
npm test
npm run lint
npm run build && npm start
```

---

## Troubleshooting

| Issue | What to try |
| ----- | ----------- |
| Rules not applying | Files under **`.cursor/rules/`**; `.mdc` or `.md`; check **Cursor Settings → Rules**. |
| Too much guidance | Drop specialist rules; trim **`AGENTS.md`**. |
| Wrong rule for files | Adjust **`globs`** in each `.mdc` to match your tree. |
| Merge / vendoring | Use **`sync-mstack.sh`** or copy only the rules you need. |

---

## License

MIT — see [LICENSE](LICENSE).
