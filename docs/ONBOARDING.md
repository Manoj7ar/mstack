# mstack — 5-minute onboarding

Use this path when you first adopt mstack in a project (or when onboarding a teammate).

## 1. Choose a rule pack

Open **[PACKS.md](PACKS.md)** and pick:

- **Minimal** — fastest: core workflow + tokens + permissions only.
- **Standard** — most apps: Minimal plus frontend, backend, tests, review, debug, security, docs, CI, etc.
- **Full** — everything in this repository, including design research, data modeling, observability, and more.

## 2. Copy files into your repo

From a checkout of mstack (or after `git submodule add`):

- `.cursor/rules/mstack-*.mdc` (only the files in your chosen pack)
- Merge **`AGENTS.md`** (or use `SYNC_AGENTS_SNIPPET=1` with `scripts/sync-mstack.sh`)
- **`templates/*.md`** you need (at minimum those referenced in `mstack-core-workflow.mdc`)

See **[README.md](../README.md)** for copy commands and **`scripts/sync-mstack.sh`**.

## 3. Add project memory (recommended)

Copy **`templates/PROJECT_MEMORY_TEMPLATE.md`** to **`docs/PROJECT_MEMORY.md`** and fill product/design basics. Agents use **`mstack-project-memory.mdc`** to read and update it when you lock preferences.

## 4. First prompt in Cursor

In Agent chat, try:

> Use mstack phases: Think → Plan → Build. Scope: [your task]. Follow `mstack-token-discipline`.

For large or unclear work, switch to **[Plan Mode](https://cursor.com/docs/agent/plan-mode)** (mode picker or **Shift+Tab**) before building.

## 5. Where answers live

| Need | Doc |
| ---- | --- |
| Phase detail | [workflow.md](workflow.md) |
| Day-to-day sprint shape | [PLAYBOOK.md](PLAYBOOK.md) |
| GStack vs mstack | [GSTACK_INSPIRATION.md](GSTACK_INSPIRATION.md) |
| Rules misbehaving | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| Visual overview (Cursor 3.1+) | `/mstack-flight-deck` — [.cursor/skills/mstack-flight-deck/SKILL.md](../.cursor/skills/mstack-flight-deck/SKILL.md) |
