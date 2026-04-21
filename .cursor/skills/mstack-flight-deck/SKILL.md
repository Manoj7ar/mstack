---
name: mstack-flight-deck
description: Build a Cursor Canvas flight deck for this repo — mstack phases and artifacts, repo memory links, architecture diagram, optional live Ideas API snapshot. Use when the user types /mstack-flight-deck, asks for a canvas overview, onboarding map, or ideas dashboard.
disable-model-invocation: true
---

# mstack flight deck (Canvas)

Open an interactive **Canvas** (Cursor 3.1+ Agents Window or editor) so the user gets a durable visual artifact instead of a long markdown wall. See [Canvas](https://cursor.com/docs/agent/tools/canvas).

## When to use

- User invoked **`/mstack-flight-deck`** or asked for a **visual overview**, **dashboard**, or **onboarding** map of this repository.
- User wants **mstack phases + templates + Ideas API** in one place.

## Data gathering (bounded)

1. Read **headings and key bullets only** from:
   - `docs/AGENT_MEMORY.md`
   - `docs/ONBOARDING.md`, `docs/PLAYBOOK.md`, `docs/POWER_USER.md` (one-line summary each for nav links)
   - `docs/PROJECT_MEMORY.md` (if present — design/product prefs heading only)
   - `docs/ARCHITECTURE.md` (especially the **Ideas API — endpoints** table)
   - Last ~400 lines of `docs/DECISIONS.md` or tail ~25 lines for **recent decisions** — do not load the whole file if huge.
2. Optional **live API snapshot** (from repo root):

   ```bash
   node scripts/ideas-snapshot.mjs
   ```

   - If `ok` is false or `error` is set: show **API offline** (or error message) in the canvas stats; still render the rest.
   - If `ok` is true: use `meta` and `ideas` for Table C and stats.

## Canvas layout (fixed section order)

Build the canvas with these sections, using Cursor canvas components (stats/boxes, tables, diagram, todos) where available:

1. **Title** — `mstack flight deck` + one line: this repo is the **mstack rules pack** plus optional **Ideas HTTP API** (`src/`, `tests/`).
2. **Stats row (boxes)** — e.g.:
   - **API:** `meta.service` + `meta.apiVersion` from snapshot, or `API offline`
   - **Runtime:** `meta.node` if present, else `—`
   - **Pack:** short hint — e.g. “sync: `MSTACK_PACK` (minimal / lite / solo / standard / full / all)” + link `docs/PACKS.md`; add “verify: `scripts/verify-mstack-sync.sh`” + link `docs/POWER_USER.md`
   - **Session:** root `SESSION_BRIEF.md` (handoff) + `templates/SESSION_BRIEF_TEMPLATE.md`; optional compact **`docs/AGENT_RECAP.md`** + `templates/AGENT_RECAP_TEMPLATE.md` / **`/mstack-lean-handoff`**
   - **Doctor:** `/mstack-doctor` + `scripts/mstack-doctor.sh`; adoption checklist `docs/ADOPTION_AUDIT.md`; first messages `docs/PLAYBOOK_FIRST_MESSAGES.md`
   - **Pack picker:** `/mstack-pack-picker` — skill `.cursor/skills/mstack-pack-picker/`
   - **Context:** `/mstack-context-budget` + `docs/CONTEXT_BUDGET.md` for long threads
   - **Ship:** `/mstack-ship-check` — pre-merge checklist for PRs
   - **Docs:** text links or labels for `docs/AGENT_MEMORY.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/CURSOR_LIMITS.md`, `docs/POWER_USER.md`, `docs/ADOPTION_AUDIT.md`, `docs/PROJECT_MEMORY.md`, `docs/ONBOARDING.md`, `docs/PLAYBOOK.md`
3. **Table A — Phases → artifacts** (use README / workflow alignment; include typical template paths):

   | Phase | Typical artifact |
   | ----- | ---------------- |
   | Think | (optional) `templates/MODEL_STRATEGY_NOTE_TEMPLATE.md` |
   | Plan | `templates/PLAN_TEMPLATE.md` |
   | Build | — |
   | Review | `@mstack-review` / review pass |
   | Test | `templates/TEST_PLAN_TEMPLATE.md` |
   | Ship | `templates/PR_CHECKLIST_TEMPLATE.md`, `templates/ADR_TEMPLATE.md` if needed |
   | Reflect | `templates/REFLECT_TEMPLATE.md` |

   Add a second small table or rows for **optional** artifacts from `docs/workflow.md`: Design brief (`templates/DESIGN_BRIEF_TEMPLATE.md`), Debug (`templates/DEBUG_SESSION_TEMPLATE.md`), Session handoff (`SESSION_BRIEF.md` / `templates/SESSION_BRIEF_TEMPLATE.md`), Postmortem (`templates/POSTMORTEM_TEMPLATE.md` / `INCIDENT_POSTMORTEM_TEMPLATE.md`), OpenAPI delta, Runbook, Product review (`templates/PRODUCT_REVIEW_TEMPLATE.md` / **`PRODUCT_REVIEW_LITE.md`**), Doc task (`templates/DOC_TASK_TEMPLATE.md`), Risk register — keep Table A scannable (merge into one table if cleaner).

4. **Table B — Ideas API routes** — mirror `docs/ARCHITECTURE.md` endpoint summary. Add column **Notes** with short hints: in-memory store, `X-Request-ID`, rate limits, `X-Session-ID` / `Idempotency-Key` where relevant.

5. **Table C (conditional)** — If snapshot has `ideas` array: show up to **20** rows with columns e.g. **Title**, **Tags** (joined), **Updated** (`updatedAt`). If empty: one row “No ideas yet (or server just started).”

6. **Diagram** — Simple **system map**: box **mstack** (`.cursor/rules`, `AGENTS.md`, `templates/`, `docs/`) → box **Ideas API** (`src/server.ts`, `src/store.ts`, in-memory). Arrow: “optional demo service in same repo.” Use the canvas diagram component or a mermaid-style structure the canvas supports.

7. **Todos (3–5)** — Actionable checklist, e.g.:
   - Update `docs/DECISIONS.md` when API or layout changes
   - Run `npm test` and `npm run lint` before ship
   - After route changes, sync `docs/ARCHITECTURE.md`
   - Re-run `node scripts/ideas-snapshot.mjs` after starting `npm run dev` to refresh Table C
   - If a chat is noisy, use **`/mstack-context-budget`** or read `docs/CONTEXT_BUDGET.md`
   - Before opening a PR, run **`/mstack-ship-check`** and paste into the description

## Closing message for the user

- Tell them the canvas is **saved** and can be **reopened** from the workspace canvas list.
- They can ask you to **iterate** (“add security row”, “only Ideas API”, “export-friendly”).
