# mstack

**mstack** is a Markdown-first **Cursor Agent** workflow pack: phase-separated work (think → plan → build → review → test → ship → reflect), token-efficient habits, and optional UI research — delivered as `.cursor/rules` and `AGENTS.md` you can copy into any codebase.

Inspired by the structured “virtual team” idea popularized by [GStack](https://github.com/garrytan/gstack) (Claude Code). **mstack is independent** content for Cursor; it is not a fork of GStack.

## What you get

- **Core workflow** — one rule for phases, handoffs, and artifacts.
- **Token discipline** — search-first, bounded reads, no redundant context.
- **Permissions** — confirm before destructive git, filesystem, DB, or production actions.
- **Specialists** — frontend, backend, accessibility, design research, testing/QA, code review, docs/DevEx (`mstack-docs-devx`) and docs/ship (`mstack-docs-ship`), data modeling (`mstack-data-modeling`) and data migrations (`mstack-data-migrations`), CI/quality (`mstack-ci-quality`) and CI workflows (`mstack-ci`), dependencies, debug, security, **model strategy** (suggest-only tier / token advice; `@mstack-model-strategy` or when asked about models/Auto/cost).
- **Templates** — plan, test plan, design brief, debug session, reflect, postmortem, PR checklist, ADR, model strategy note under `templates/`.

## Quick start

1. Copy into your project (or submodule — see below):
   - `AGENTS.md`
   - `.cursor/rules/mstack-*.mdc`
   - `templates/` (optional but recommended)
2. Open the project in **Cursor**. Rules are picked up from `.cursor/rules/` and `AGENTS.md` per [Cursor Rules](https://cursor.com/docs/rules).
3. Tell the Agent: *Use mstack phases for this task* or work through **Think → Plan → Build** explicitly.

## Install options

### Copy (simplest)

From a checkout of this repo:

```bash
# In your app repo root
cp /path/to/mstack/AGENTS.md .
mkdir -p .cursor/rules templates
cp /path/to/mstack/.cursor/rules/mstack-*.mdc .cursor/rules/
cp -r /path/to/mstack/templates/* templates/
```

Merge `AGENTS.md` if you already have one (combine sections; avoid duplicate global instructions).

### Git submodule

```bash
git submodule add <this-repo-url> vendor/mstack
# Then copy or symlink rules (symlinks are fine on macOS/Linux if your team allows them)
mkdir -p .cursor/rules
ln -sf ../../vendor/mstack/.cursor/rules/mstack-*.mdc .cursor/rules/
cp vendor/mstack/AGENTS.md ./AGENTS.md.mstack-snippet   # merge manually into your AGENTS.md
```

Re-init after clone: `git submodule update --init --recursive`.

### Subset of rules

Omit any `mstack-*.mdc` you do not want (e.g. skip `mstack-security-review.mdc` on tiny prototypes). **Keep** `mstack-core-workflow.mdc`, `mstack-token-discipline.mdc`, and `mstack-permissions.mdc` for the full experience.

### Sync script (submodule)

From your app repo, with mstack at `vendor/mstack`:

```bash
chmod +x vendor/mstack/scripts/sync-mstack.sh
MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/sync-mstack.sh
```

Copies `mstack-*.mdc` and `templates/*.md` into the current directory. With `SYNC_AGENTS_SNIPPET=1`, also writes `AGENTS.md.mstack-snippet` for manual merge. Otherwise merge `AGENTS.md` yourself.

### Manual rule in chat

Cursor supports **@mentioning** a rule to apply it. For example, use **`@mstack-debug`** when you want the debug posture even if the rule is not file-scoped.

## Model choice and tokens (advisory)

mstack **`mstack-model-strategy.mdc`** teaches the Agent to classify tasks and suggest whether a **faster / default / more capable** model might fit, and how to **save tokens**—in chat, not by switching models for you. **Cursor does not let project rules change the active model**; use the **model picker** (or Auto) yourself. Optional: `templates/MODEL_STRATEGY_NOTE_TEMPLATE.md`.

## Cursor Plan Mode

For **complex** or **ambiguous** work (many files, unclear requirements, architectural choice), use **Plan Mode** in the Agent panel — **mode dropdown** or **Shift+Tab**. The Agent asks clarifying questions, researches the codebase, and produces a **plan you can edit** before building; save to workspace for the team. Details: [Cursor Plan Mode](https://cursor.com/docs/agent/plan-mode). Align saved plans with `templates/PLAN_TEMPLATE.md`.

## Cursor Debug Mode

For **bugs** that are hard to pin down from code alone (timing, regressions, runtime state), use Cursor’s **Debug Mode** in the Agent panel — **mode dropdown** or **Shift+Tab** to cycle modes. It is built for hypothesize → instrument → you reproduce → analyze logs → fix → verify → cleanup. Details: [Cursor Debug Mode](https://cursor.com/docs/agent/debug-mode).

mstack’s `mstack-debug.mdc` adds a **permission gate**: the Agent should **not** add temporary logging, probes, or log-capture reproduction steps until you **explicitly allow** invasive debugging for that session. You can use `templates/DEBUG_SESSION_TEMPLATE.md` to record consent and notes.

## Web & design research (permission)

By default, mstack rules tell the Agent **not** to fetch external sites unless you **explicitly allow** web research for that task. When allowed, use references (Mobbin, 21st.dev, Magic UI, etc.) for **patterns**, not verbatim copying — cite URLs and adapt to your design system.

## Troubleshooting

| Issue | What to try |
| ----- | ----------- |
| Rules feel ignored | Confirm files are under `.cursor/rules/`, extension `.mdc` or `.md`; check rule type in Cursor Settings → Rules. |
| Too much instruction | Remove specialist rules you do not need; shorten `AGENTS.md`. |
| Wrong rule firing | Adjust `globs` in `.mdc` frontmatter to match your repo layout. |

## Repo layout

```text
AGENTS.md
.cursor/rules/mstack-*.mdc
docs/workflow.md
docs/AGENT_MEMORY.md
docs/ARCHITECTURE.md
docs/DECISIONS.md
scripts/sync-mstack.sh
templates/PLAN_TEMPLATE.md
templates/TEST_PLAN_TEMPLATE.md
templates/DESIGN_BRIEF_TEMPLATE.md
templates/DEBUG_SESSION_TEMPLATE.md
templates/REFLECT_TEMPLATE.md
templates/POSTMORTEM_TEMPLATE.md
templates/PR_CHECKLIST_TEMPLATE.md
templates/ADR_TEMPLATE.md
templates/INCIDENT_POSTMORTEM_TEMPLATE.md
templates/MODEL_STRATEGY_NOTE_TEMPLATE.md
```

**Agent-oriented docs** (`docs/AGENT_MEMORY.md`, `ARCHITECTURE.md`, `DECISIONS.md`) are the project’s **long-term memory** — update them when you change API behavior or layout.

## Ideas HTTP API (optional service in this repo)

This branch also includes a small **Node/TypeScript** HTTP service for capturing ideas (validation, session preferences, idempotency, rate limits). Source lives under `src/` and `tests/`.

### Run

```bash
npm install
npm run dev
```

Default port: `3000` (override with `PORT`). Optional: `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`.

### Endpoints

- `GET /health` — liveness
- `GET /v1/meta` — service name, API version, Node version
- `GET /v1/ideas?tag=` — list ideas (optional tag filter)
- `GET /v1/ideas/:id` — single idea
- `POST /v1/ideas` — create idea (JSON body: `title`, optional `summary`, `tags`). Headers: optional `X-Session-ID`, optional `Idempotency-Key`
- `PATCH /v1/ideas/:id` — partial update (`title`, `summary`, and/or `tags`; at least one required). Optional `X-Session-ID` merges session default tags when `tags` is sent
- `DELETE /v1/ideas/:id` — remove idea (no body)
- `PATCH /v1/session/preferences` — update preferences for a session. Header: `X-Session-ID` (required). Body: optional `defaultTags`, `summarizeTitles`

Responses include `X-Request-ID` and a JSON `requestId` field.

### Test / build

```bash
npm test
npm run lint
npm run build && npm start
```

## License

MIT — see [LICENSE](LICENSE).
