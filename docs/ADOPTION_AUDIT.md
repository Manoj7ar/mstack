# mstack adoption audit

Use this checklist when **onboarding a repo** or **quarterly** to catch silent drift. For an agent-driven pass, **`@mstack-adoption-audit`** (rule in **full** pack).

## Rules and location

- [ ] **`.cursor/rules/`** exists and contains at least **`mstack-core-workflow.mdc`**, **`mstack-token-discipline.mdc`**, **`mstack-permissions.mdc`**
- [ ] Chosen **pack** matches intent: [PACKS.md](PACKS.md) and `vendor/mstack/scripts/packs/<pack>.txt` (or your fork)
- [ ] Optional: CI runs **`verify-mstack-sync.sh --strict`** with correct **`MSTACK_ROOT`** and **`MSTACK_PACK`**

## Bootstrap files

- [ ] **`AGENTS.md`** at repo root merged with your project’s instructions (or deliberate omission documented)
- [ ] **`docs/PROJECT_MEMORY.md`** exists if you use **`mstack-project-memory`** (copy from `templates/PROJECT_MEMORY_TEMPLATE.md`)

## Session handoff

- [ ] Team agrees: root **`SESSION_BRIEF.md`** is **tracked** (history) or **gitignored** (scratch only)—see [PLAYBOOK.md](PLAYBOOK.md)

## Local verify

- [ ] **`bash scripts/mstack-doctor.sh`** passes (from repo root; set **`MSTACK_ROOT`** / **`MSTACK_PACK`** to also run pack verify)
- [ ] First-message patterns fit your team: [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md)
- [ ] Optional: day-one trace — [templates/MSTACK_DAY_ONE_CHECKLIST.md](../templates/MSTACK_DAY_ONE_CHECKLIST.md) or [STARTER_KIT.md](STARTER_KIT.md)

## Limits

mstack cannot change Cursor models or replace product judgment—see [CURSOR_LIMITS.md](CURSOR_LIMITS.md).
