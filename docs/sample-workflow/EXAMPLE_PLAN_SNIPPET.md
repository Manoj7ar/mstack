# Example plan snippet — add `priority` to Ideas API

_Copy into `templates/PLAN_TEMPLATE.md` sections or Plan Mode chat._

## Goal

Add optional **`priority`**: `low` | `medium` | `high` on ideas; default `medium` if omitted.

## Files to touch

- `src/schemas.ts` — Zod enum + defaults on create
- `src/store.ts` — `Idea` type; normalize on create/patch
- `src/openapi.ts` — `idea` schema + examples
- `tests/server.test.ts` — create with priority; reject invalid enum

## Risks

- OpenAPI + in-memory model drift → run `GET /v1/openapi.json` after changes
- File store JSON migration → new field optional; old files load as default `medium`

## Done when

- Tests green; ship checklist satisfied; `IDEAS_STORE_PATH` smoke if touching store
