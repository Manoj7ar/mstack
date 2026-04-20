# mstack

**mstack** is a Markdown-first **Cursor Agent** workflow pack: phase-separated work (think → plan → build → review → test → ship → reflect), token-efficient habits, and optional UI research — delivered as `.cursor/rules` and `AGENTS.md` you can copy into any codebase.

Inspired by the structured “virtual team” idea popularized by [GStack](https://github.com/garrytan/gstack) (Claude Code). **mstack is independent** content for Cursor; it is not a fork of GStack.

## What you get

- **Core workflow** — one rule for phases, handoffs, and artifacts.
- **Token discipline** — search-first, bounded reads, no redundant context.
- **Specialists** — frontend, backend, design research, testing/QA, debug, security (scoped with `globs` where useful).
- **Templates** — plan, test plan, design brief, debug session under `templates/`.

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

Omit any `mstack-*.mdc` you do not want (e.g. skip `mstack-security-review.mdc` on tiny prototypes). **Keep** `mstack-core-workflow.mdc` and `mstack-token-discipline.mdc` for the full experience.

### Sync script (submodule)

From your app repo, with mstack at `vendor/mstack`:

```bash
chmod +x vendor/mstack/scripts/sync-mstack.sh
MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/sync-mstack.sh
```

Copies `mstack-*.mdc` and `templates/*.md` into the current directory. Merge `AGENTS.md` yourself.

### Manual rule in chat

Cursor supports **@mentioning** a rule to apply it. For example, use **`@mstack-debug`** when you want the debug posture even if the rule is not file-scoped.

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
scripts/sync-mstack.sh
templates/PLAN_TEMPLATE.md
templates/TEST_PLAN_TEMPLATE.md
templates/DESIGN_BRIEF_TEMPLATE.md
templates/DEBUG_SESSION_TEMPLATE.md
```

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
- `GET /v1/ideas?tag=` — list ideas (optional tag filter)
- `GET /v1/ideas/:id` — single idea
- `POST /v1/ideas` — create idea (JSON body: `title`, optional `summary`, `tags`). Headers: optional `X-Session-ID`, optional `Idempotency-Key`
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
