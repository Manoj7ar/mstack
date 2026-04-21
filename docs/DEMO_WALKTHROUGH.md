# Demo walkthrough (mstack + Ideas API in this repo)

A **single linear story** you can follow in **this repository** to see the workflow pack and the reference API work together. For adopting mstack in **another** repo, use [STARTER_KIT.md](STARTER_KIT.md).

## Act 1 — Pack and verify

1. Open [PACKS.md](PACKS.md) and pick **`standard`** or **`full`** if you want breaking-change rules later.
2. From repo root: `npm run mstack:doctor` (or `bash scripts/mstack-doctor.sh .`).
3. Optional strict check: `bash scripts/verify-packs-internal.sh` (maintainers).

## Act 2 — Plan (Cursor Plan Mode)

1. Switch to **Plan Mode** in Cursor when scope is fuzzy.
2. Copy structure from [templates/PLAN_TEMPLATE.md](../templates/PLAN_TEMPLATE.md).
3. Example goal: *“Add optional `priority` field to ideas (low|medium|high), validated, listed in OpenAPI, with tests.”*

## Act 3 — Build (exact touch list)

Typical files for that feature:

| File | Change |
| ---- | ------ |
| [src/schemas.ts](../src/schemas.ts) | Zod: optional `priority` on create/patch |
| [src/store.ts](../src/store.ts) | `Idea` type + persist in memory/file snapshot |
| [src/server.ts](../src/server.ts) | Wire if new behavior at HTTP layer |
| [src/openapi.ts](../src/openapi.ts) | Document field + responses |
| [tests/server.test.ts](../tests/server.test.ts) | Create + patch + invalid value |

See stub narrative in [sample-workflow/EXAMPLE_PLAN_SNIPPET.md](sample-workflow/EXAMPLE_PLAN_SNIPPET.md).

## Act 4 — Review

1. In Agent: `@mstack-review` — adversarial pass, no new scope.
2. Walk [templates/PR_CHECKLIST_TEMPLATE.md](../templates/PR_CHECKLIST_TEMPLATE.md).

## Act 5 — Ship

1. Type **`/mstack-ship-check`**; paste the checklist into the PR.
2. If the API surface changed: [templates/OPENAPI_DELTA_TEMPLATE.md](../templates/OPENAPI_DELTA_TEMPLATE.md).
3. If the decision is architectural: [templates/ADR_TEMPLATE.md](../templates/ADR_TEMPLATE.md) (example: [sample-workflow/EXAMPLE_ADR_SNIPPET.md](sample-workflow/EXAMPLE_ADR_SNIPPET.md)).

## Act 6 — Project memory

When you **lock** a product or API convention, append a **dated bullet** to [PROJECT_MEMORY.md](PROJECT_MEMORY.md).

## Optional — realism

- **File-backed demo data:** set `IDEAS_STORE_PATH=./data/ideas-store.json` before `npm run dev` (see [ARCHITECTURE.md](ARCHITECTURE.md)).
- **Debug narrative:** [sample-workflow/EXAMPLE_DEBUG_SESSION_SNIPPET.md](sample-workflow/EXAMPLE_DEBUG_SESSION_SNIPPET.md).
- **Runbook:** [sample-workflow/EXAMPLE_RUNBOOK_SNIPPET.md](sample-workflow/EXAMPLE_RUNBOOK_SNIPPET.md).

## See also

- [SRC_INTERNAL.md](SRC_INTERNAL.md) — `src/` module map
- [workflow.md](workflow.md) — phases
- [RECIPES.md](RECIPES.md) — task → `@mention`
