# mstack — agent bootstrap

This repo ships **mstack**: opinionated Cursor Agent rules for phase-separated work (think → plan → build → review → test → ship → reflect) and token-efficient tooling habits.

## For Cursor Agent

1. **Follow** the project rules under `.cursor/rules/mstack-*.mdc`. The phase machine and handoffs live in `mstack-core-workflow.mdc`.
2. **Use** `templates/PLAN_TEMPLATE.md`, `templates/TEST_PLAN_TEMPLATE.md`, `templates/DESIGN_BRIEF_TEMPLATE.md`, and `templates/DEBUG_SESSION_TEMPLATE.md` when planning, testing, UI work, or structured debugging respectively.
3. **Token discipline** is in `mstack-token-discipline.mdc` — prefer narrow search, bounded file reads, and short summaries before large edits.
4. **Web and external design research** (e.g. inspiration sites): only after the user **explicitly permits** web research for this task. See `mstack-design-research.mdc` and the root `README.md`.
5. **Scope**: match existing repo conventions; avoid drive-by refactors unless asked.
6. **Runtime debugging**: prefer **Cursor Debug Mode** for bugs that need execution evidence ([Debug Mode](https://cursor.com/docs/agent/debug-mode)). **Ask the user** before adding temporary logging, probes, or asking them to reproduce solely to capture logs — see `mstack-debug.mdc`.

## Inspiration note

mstack is **inspired by** the structured “virtual team” workflow idea popularized by projects like [GStack](https://github.com/garrytan/gstack) (Claude Code). mstack is **independent** content for **Cursor** (`.cursor/rules`, `AGENTS.md`); it is not a fork of GStack.

## Human docs

- Narrative workflow: [docs/workflow.md](docs/workflow.md)
- Install and adoption: [README.md](README.md)
- **Repo memory (this checkout):** [docs/AGENT_MEMORY.md](docs/AGENT_MEMORY.md) → [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) → [docs/DECISIONS.md](docs/DECISIONS.md). When changing the Ideas API or layout, update these in the same PR.
