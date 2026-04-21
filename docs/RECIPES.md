# mstack recipes (task → rule → template)

Use this when you know **what you are doing** but not **which `@mention` or template** to grab. For **overlapping** specialists, see [SPECIALIST_MAP.md](SPECIALIST_MAP.md).

| Scenario | Invoke / skill | Templates (when useful) |
| -------- | -------------- | ------------------------ |
| First install in a repo | **`/mstack-first-sync`**, **`/mstack-pack-picker`** | [STARTER_KIT.md](STARTER_KIT.md), [MSTACK_DAY_ONE_CHECKLIST.md](../templates/MSTACK_DAY_ONE_CHECKLIST.md) |
| Submodule / vendor bump | **`/mstack-upgrade-vendor`** | [VENDOR_UPGRADE.md](VENDOR_UPGRADE.md) |
| Ambiguous multi-file feature | Plan Mode + `@mstack-core-workflow` (implicit) | `PLAN_TEMPLATE.md` |
| Chore / tiny change | `@mstack-mechanical-pass` | — |
| Explore unfamiliar code | `@mstack-surgical-investigation` | — |
| Code review pass | `@mstack-review` | — |
| Frontend / UI change | `@mstack-frontend` | `DESIGN_BRIEF_TEMPLATE.md`, `UI_ACCEPTANCE_CHECKLIST.md` (before merge) |
| Accessibility pass | `@mstack-accessibility` | — |
| Backend / API route | `@mstack-backend` | — |
| API contract / OpenAPI change | `@mstack-api-contracts` | `OPENAPI_DELTA_TEMPLATE.md` |
| Tests / QA | `@mstack-testing-qa` | `TEST_PLAN_TEMPLATE.md` |
| Runtime bug | Debug Mode + `@mstack-debug` | `DEBUG_SESSION_TEMPLATE.md` |
| Prod hotfix / rollback | `@mstack-permissions` (destructive gates) + `@mstack-debug` if runtime | `HOTFIX_OR_ROLLBACK_CHECKLIST.md` → `POSTMORTEM_TEMPLATE.md` |
| Schema / data model | `@mstack-data-modeling` | `ADR_TEMPLATE.md` |
| DB migration | `@mstack-data-migrations` | — |
| Security-sensitive change | `@mstack-security-review` | `SECURITY_REVIEW_LITE.md` (quick pass) |
| Secrets / env / CI vars | `@mstack-secrets-env` | `SECRETS_AND_ENV_CHECKLIST.md` |
| Docs / ship note | `@mstack-documentation-pass` or `@mstack-docs-ship` | `DOC_TASK_TEMPLATE.md` |
| Release / versioning | `@mstack-release-versioning` | `RELEASE_OWNER_CHECKLIST.md` |
| Big product bet | `@mstack-product-review` | `PRODUCT_REVIEW_TEMPLATE.md` or `PRODUCT_REVIEW_LITE.md` |
| Feature flags | `@mstack-feature-flags` | `FEATURE_FLAG_CHANGE_CHECKLIST.md` |
| i18n / locales | `@mstack-i18n-localization` | `LOCALIZATION_QA_TEMPLATE.md` |
| Privacy / PII | `@mstack-privacy-data-handling` | `PRIVACY_IMPACT_LITE.md` |
| OSS license / NOTICE | `@mstack-open-source-license` | `LICENSE_HYGIENE_CHECKLIST.md` |
| Session / chat handoff | `@mstack-session-handoff`, **`/mstack-lean-handoff`** | `SESSION_BRIEF_TEMPLATE.md`, `AGENT_RECAP_TEMPLATE.md` |
| Long thread / huge `@` context | **`/mstack-context-budget`**, `@mstack-surgical-investigation` | [CONTEXT_BUDGET.md](CONTEXT_BUDGET.md) |
| Breaking API / major dep / migration | `@mstack-breaking-change` (full pack; manual) | `BREAKING_CHANGE_CHECKLIST.md` |
| Install audit | `@mstack-adoption-audit` (full pack) | [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md) |
| Before merge / open PR | **`/mstack-ship-check`** | `PR_CHECKLIST_TEMPLATE.md`, `SECRETS_AND_ENV_CHECKLIST.md`, optional `UI_ACCEPTANCE_CHECKLIST.md`, `SECURITY_REVIEW_LITE.md` |

**Principle:** Prefer **one primary** rule per task; add a **second** only when the task clearly spans domains (e.g. API + contract).

## See also

- [workflow.md](workflow.md) — phases
- [PACKS.md](PACKS.md) — which rules ship in each pack
- [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md) — copy-paste openers
