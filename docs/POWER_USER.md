# mstack — power-user recipes

Short patterns for people who already know Cursor. This does **not** add new platform capabilities—see [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

## Vendored mstack + CI

1. Submodule or copy mstack to e.g. `vendor/mstack`.
2. Sync a curated pack: `MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard INIT_PROJECT_MEMORY=1 vendor/mstack/scripts/sync-mstack.sh`
3. In CI or pre-commit, verify no drift:

   ```bash
   MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/verify-mstack-sync.sh --strict standard
   ```

Pack lists are the source of truth: `vendor/mstack/scripts/packs/<pack>.txt`. Details: [PACKS.md](PACKS.md).

## New chat bootstrap

- **Prefer:** maintain root **`SESSION_BRIEF.md`** (shape: `templates/SESSION_BRIEF_TEMPLATE.md`). First message: *Read `SESSION_BRIEF.md` and `docs/PROJECT_MEMORY.md`.*
- **Handoff rule:** `@mstack-session-handoff`

## Parallel agents

- **One human** merges the winning diff; avoid two agents editing the same files blindly.
- Have each agent **update `SESSION_BRIEF.md`** or leave a short “next” section so the owner can consolidate.

## Mechanical vs full phases

- **`@mstack-mechanical-pass`** — typos, single-file chores, obvious fixes: 3–5 line inline plan, skip long templates; still obey token discipline and destructive-op gates.
- **Full `mstack-core-workflow`** — auth, migrations, new user-facing behavior, cross-cutting refactors, anything security-sensitive.

## See also

- [PLAYBOOK.md](PLAYBOOK.md) — handoff checklist
- [ONBOARDING.md](ONBOARDING.md) — packs and first sync
