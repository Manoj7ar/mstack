# mstack in monorepos

mstack is **one rules pack**; monorepos are **many packages**. The goal is **one coherent Agent posture** without duplicating 37 rules per folder.

## Cursor: nested `AGENTS.md`

Cursor supports **`AGENTS.md`** at the **repo root** and in **nested directories** ([Rules](https://cursor.com/docs/context/rules)). Typical pattern:

- **Root `AGENTS.md`** — project-wide mstack bootstrap (merged from this repo’s `AGENTS.md` snippets).
- **Package `apps/web/AGENTS.md`**, **`packages/api/AGENTS.md`** — only **extra** constraints (e.g. “Next.js app”, “Nest service”) so you do not fork the whole mstack list.

## One vendor copy of mstack

Keep **one** checkout (e.g. **`vendor/mstack`**) at the **monorepo root**. Run **`sync-mstack.sh`** **once** from root so **`.cursor/rules/`** and **`.cursor/skills/`** stay **single-sourced**.

- **Do not** sync mstack separately into every package unless you have a deliberate reason (it creates drift).

## Project memory: root vs package

- **Default:** **`docs/PROJECT_MEMORY.md`** at **monorepo root** — shared design language and product terms.
- **Optional:** **`docs/PROJECT_MEMORY.md`** under a package if that app has **distinct** UX or vocabulary; mention the path in that package’s nested **`AGENTS.md`** so Agent knows where to read.

## Chat context: use `@` paths

When work is **local to one package**, narrow Cursor context:

- **`@packages/foo/...`** or **`@apps/web/...`** in the first message so globbed rules and search stay **bounded** (aligns with `mstack-token-discipline`).

## Upgrades

Same as a single package: **[VENDOR_UPGRADE.md](VENDOR_UPGRADE.md)** from **monorepo root**. **`/mstack-upgrade-vendor`** in Agent.

## See also

- [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md) — Agent vs IDE, rule precedence
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — globs, merge issues
- [RECIPES.md](RECIPES.md) — which `@rule` for which task
