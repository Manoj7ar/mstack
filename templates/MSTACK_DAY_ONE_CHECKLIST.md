# mstack — day one checklist

_Use when onboarding a repo or teammate. Full audit: [docs/ADOPTION_AUDIT.md](../docs/ADOPTION_AUDIT.md). One-page guide: [docs/STARTER_KIT.md](../docs/STARTER_KIT.md)._

**Date:** YYYY-MM-DD · **Repo:**

## Before first Agent task

- [ ] **Pack chosen** ([PACKS.md](../docs/PACKS.md)): `minimal` / `lite` / `solo` / `standard` / `full`
- [ ] **`sync-mstack.sh` run** from consumer root (`MSTACK_ROOT`, `MSTACK_PACK`, optional `INIT_PROJECT_MEMORY=1`)
- [ ] **`AGENTS.md`** merged or **`AGENTS.md.mstack-snippet`** produced (`SYNC_AGENTS_SNIPPET=1`)
- [ ] **`docs/PROJECT_MEMORY.md`** exists if using **`mstack-project-memory`** (template: `PROJECT_MEMORY_TEMPLATE.md`)
- [ ] **`mstack-doctor`** passes (optional: `MSTACK_VERIFY_STRICT=1` with correct pack)

## First session

- [ ] **`SESSION_BRIEF.md`** or **`docs/AGENT_RECAP.md`** policy agreed (tracked vs gitignored)
- [ ] One **successful Agent task** using a line from [PLAYBOOK_FIRST_MESSAGES.md](../docs/PLAYBOOK_FIRST_MESSAGES.md)

## Optional

- [ ] **`verify-mstack-sync.sh --strict`** matches chosen pack ([POWER_USER.md](../docs/POWER_USER.md))
- [ ] **`/mstack-flight-deck`** or **`/mstack-pack-picker`** tried once
