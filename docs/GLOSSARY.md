# Glossary (Cursor + mstack)

Short definitions with pointers to full docs. **Start here if jargon is confusing:** [DOCS_MAP.md](DOCS_MAP.md).

## Cursor surfaces

- **Agent** — Cursor’s **chat agent** that can use tools (search, read, edit, terminal, etc.). mstack rules target Agent workflows first. See [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md).
- **Chat / Composer** — Cursor’s **pair-programming chat**; can feel lighter than Agent for Q&A and small edits. Same stack idea: product + rules + message ([CURSOR_BASE_BEHAVIOR.md](CURSOR_BASE_BEHAVIOR.md)).
- **Plan Mode** — User-selected mode for **plan-before-build**; rules can suggest when to use it, not turn it on. [CURSOR_LIMITS.md](CURSOR_LIMITS.md).
- **Debug Mode** — User-selected mode for **runtime** investigation; pair with `@mstack-debug`. [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md).
- **Canvas** — Visual artifacts in the Agents UI; e.g. **`/mstack-flight-deck`**. [SKILLS.md](SKILLS.md).
- **MCP (Model Context Protocol)** — Optional **extra tools/resources** for Agent via configured servers. [CURSOR_MCP.md](CURSOR_MCP.md).

## Rules and files

- **Project rules** — Files under **`.cursor/rules/`** (often **`.mdc`**) plus optional **`.md`**. Shipped by mstack as `mstack-*.mdc`. [PACKS.md](PACKS.md), [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md).
- **`alwaysApply`** — Frontmatter flag: rule is included **every** Agent turn when enabled (mstack uses this sparingly for core trio). [TROUBLESHOOTING.md](TROUBLESHOOTING.md).
- **Glob** — Path pattern in a rule frontmatter; rule auto-attaches when matching files are in context. [TROUBLESHOOTING.md](TROUBLESHOOTING.md).
- **`@mention` / `@rule-name`** — Manually pull a rule into chat (e.g. `@mstack-debug`). [RECIPES.md](RECIPES.md).
- **`AGENTS.md`** — Root (or nested) bootstrap file Cursor loads with rules. Merge mstack’s bootstrap into **one** coherent file per repo. [MONOREPO.md](MONOREPO.md).
- **Remote rule import** — Cursor can pull rules from GitHub without a submodule. [RULES_SOURCE.md](RULES_SOURCE.md).

## mstack-specific

- **Pack** — Named bundle of rules (`minimal`, `lite`, `solo`, `standard`, `full`) from `scripts/packs/*.txt`. Chosen via **`MSTACK_PACK`** when running `sync-mstack.sh`. [PACKS.md](PACKS.md).
- **Skill** — Explicit **`/mstack-*`** command backed by `.cursor/skills/.../SKILL.md`. [SKILLS.md](SKILLS.md).
- **Vendor / sync** — Copy or submodule mstack into your app, then run **`scripts/sync-mstack.sh`**. [STARTER_KIT.md](STARTER_KIT.md), [VENDOR_UPGRADE.md](VENDOR_UPGRADE.md).
- **`MSTACK_PACK`** — Env var selecting which pack to sync. [PACKS.md](PACKS.md).
- **`verify-mstack-sync.sh`** — Compares installed `.cursor/rules` to a pack manifest; **`--strict`** for exact match. [POWER_USER.md](POWER_USER.md).
- **`mstack-doctor`** — Script + skill that checks required files exist. [CONTRIBUTING.md](../CONTRIBUTING.md).
- **`PROJECT_MEMORY`** — Usually **`docs/PROJECT_MEMORY.md`**: durable design/product preferences. [mstack-project-memory.mdc](../.cursor/rules/mstack-project-memory.mdc).
- **`SESSION_BRIEF` / `AGENT_RECAP`** — Handoff files for **chat switches**; `SESSION_BRIEF.md` at root, optional `docs/AGENT_RECAP.md`. [PLAYBOOK.md](PLAYBOOK.md), [CONTEXT_BUDGET.md](CONTEXT_BUDGET.md).

## See also

- [ANTI_PATTERNS.md](ANTI_PATTERNS.md) — common mistakes  
- [FAQ.md](FAQ.md) — quick answers
