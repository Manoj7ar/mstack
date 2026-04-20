# mstack — agent bootstrap

This repo ships **mstack**: opinionated Cursor Agent rules for phase-separated work (think → plan → build → review → test → ship → reflect) and token-efficient tooling habits.

## For Cursor Agent

1. **Follow** the project rules under `.cursor/rules/mstack-*.mdc`. The phase machine and handoffs live in `mstack-core-workflow.mdc`.
2. **Use** `templates/PLAN_TEMPLATE.md`, `templates/TEST_PLAN_TEMPLATE.md`, `templates/DESIGN_BRIEF_TEMPLATE.md`, `templates/DEBUG_SESSION_TEMPLATE.md`, `templates/SESSION_BRIEF_TEMPLATE.md` (for root `SESSION_BRIEF.md` handoffs), `templates/REFLECT_TEMPLATE.md`, `templates/POSTMORTEM_TEMPLATE.md`, `templates/PR_CHECKLIST_TEMPLATE.md`, `templates/ADR_TEMPLATE.md`, `templates/INCIDENT_POSTMORTEM_TEMPLATE.md`, `templates/MODEL_STRATEGY_NOTE_TEMPLATE.md`, `templates/OPENAPI_DELTA_TEMPLATE.md`, `templates/RUNBOOK_TEMPLATE.md`, `templates/PROJECT_MEMORY_TEMPLATE.md`, `templates/PRODUCT_REVIEW_TEMPLATE.md`, `templates/PRODUCT_REVIEW_LITE.md`, `templates/DOC_TASK_TEMPLATE.md`, `templates/RISK_REGISTER_TEMPLATE.md`, `templates/SECRETS_AND_ENV_CHECKLIST.md`, `templates/LOCALIZATION_QA_TEMPLATE.md`, and `templates/RELEASE_OWNER_CHECKLIST.md` when relevant. Rule presets: [docs/PACKS.md](docs/PACKS.md). Cursor limits (models, modes): [docs/CURSOR_LIMITS.md](docs/CURSOR_LIMITS.md).
3. **Token discipline** is in `mstack-token-discipline.mdc` — prefer narrow search, bounded file reads, and short summaries before large edits.
4. **Web and external design research** (e.g. inspiration sites): only after the user **explicitly permits** web research for this task. See `mstack-design-research.mdc` and the root `README.md`.
5. **Scope**: match existing repo conventions; avoid drive-by refactors unless asked.
6. **Runtime debugging**: prefer **Cursor Debug Mode** for bugs that need execution evidence ([Debug Mode](https://cursor.com/docs/agent/debug-mode)). **Ask the user** before adding temporary logging, probes, or asking them to reproduce solely to capture logs — see `mstack-debug.mdc`.
7. **Complex planning**: use **Cursor Plan Mode** when requirements or blast radius are unclear ([Plan Mode](https://cursor.com/docs/agent/plan-mode)); align saved plans with `templates/PLAN_TEMPLATE.md`.
8. **Destructive actions**: confirm with the user before irreversible git, filesystem, DB, or production operations — see `mstack-permissions.mdc`.
9. **Model choice**: rules cannot switch Cursor models. For tier and token advice, follow `mstack-model-strategy.mdc` and give **suggestions** only; the user changes the model in the UI.
10. **Project memory**: durable design and product preferences live in **`docs/PROJECT_MEMORY.md`** (this repo). Read before substantive UI/product work; append **dated bullets** when the user explicitly locks a preference. See `mstack-project-memory.mdc`. Other repos may set a different path in this file.
11. **Canvas flight deck (optional):** For a visual overview of mstack phases, repo memory links, and an optional live Ideas API snapshot, the user can invoke **`/mstack-flight-deck`** (skill: `.cursor/skills/mstack-flight-deck/`). Requires Cursor 3.1+ for [Canvas](https://cursor.com/docs/agent/tools/canvas). **`/mstack-pack-picker`** helps choose **`MSTACK_PACK`** (skill: `.cursor/skills/mstack-pack-picker/`).
12. **Big product bets:** before a large Plan, consider `@mstack-product-review` and `templates/PRODUCT_REVIEW_TEMPLATE.md` (or `templates/PRODUCT_REVIEW_LITE.md` for smaller scope). For doc drift after features, `@mstack-documentation-pass` and `templates/DOC_TASK_TEMPLATE.md`. Human navigation: [docs/ONBOARDING.md](docs/ONBOARDING.md), [docs/PLAYBOOK.md](docs/PLAYBOOK.md).
13. **Session handoff file:** when switching chats, prefer updating root **`SESSION_BRIEF.md`** using `templates/SESSION_BRIEF_TEMPLATE.md`; see `@mstack-session-handoff`. **Mechanical / chore tasks:** `@mstack-mechanical-pass` (short inline plan; not for auth, migrations, or new product behavior). Power-user patterns: [docs/POWER_USER.md](docs/POWER_USER.md).
14. **Adoption audit:** **`@mstack-adoption-audit`** walks [docs/ADOPTION_AUDIT.md](docs/ADOPTION_AUDIT.md) against the workspace (full pack). **Install checks:** user may run **`/mstack-doctor`** or `scripts/mstack-doctor.sh`. Copy-paste openers: [docs/PLAYBOOK_FIRST_MESSAGES.md](docs/PLAYBOOK_FIRST_MESSAGES.md).

## Inspiration note

mstack is **inspired by** the structured “virtual team” workflow idea popularized by projects like [GStack](https://github.com/garrytan/gstack) (Claude Code). mstack is **independent** content for **Cursor** (`.cursor/rules`, `AGENTS.md`); it is not a fork of GStack.

## Human docs

- Narrative workflow: [docs/workflow.md](docs/workflow.md)
- Onboarding: [docs/ONBOARDING.md](docs/ONBOARDING.md) · Playbook: [docs/PLAYBOOK.md](docs/PLAYBOOK.md) · Power user: [docs/POWER_USER.md](docs/POWER_USER.md) · GStack mapping: [docs/GSTACK_INSPIRATION.md](docs/GSTACK_INSPIRATION.md) · Troubleshooting: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- Rule packs (minimal / lite / solo / standard / full): [docs/PACKS.md](docs/PACKS.md)
- Install and adoption: [README.md](README.md)
- **Repo memory (this checkout):** [docs/AGENT_MEMORY.md](docs/AGENT_MEMORY.md) → [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) → [docs/DECISIONS.md](docs/DECISIONS.md) → [docs/PROJECT_MEMORY.md](docs/PROJECT_MEMORY.md). When changing the Ideas API or layout, update these in the same PR.
