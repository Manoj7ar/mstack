# mstack — power-user recipes

Short patterns for people who already know Cursor. This does **not** add new platform capabilities—see [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

**Token habits (honest scope):** [TOKEN_LEVERS.md](TOKEN_LEVERS.md) — narrow context, recap files, smaller packs; rules do not guarantee bill reduction.

## Vendored mstack + CI

1. Submodule or copy mstack to e.g. `vendor/mstack`.
2. Sync a curated pack: `MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard INIT_PROJECT_MEMORY=1 vendor/mstack/scripts/sync-mstack.sh`
3. In CI or pre-commit, verify no drift:

   ```bash
   MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/verify-mstack-sync.sh --strict standard
   ```

Pack lists are the source of truth: `vendor/mstack/scripts/packs/<pack>.txt`. Details: [PACKS.md](PACKS.md).

**GitHub Actions:** see `.github/workflows/mstack-pack-verify.yml.example` in this repo (copy and rename to `.yml`).

## Doctor (quick local check)

From consumer repo root (paths may be `vendor/mstack/...`):

```bash
bash vendor/mstack/scripts/mstack-doctor.sh .
# Include strict pack verify:
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard MSTACK_VERIFY_STRICT=1 bash vendor/mstack/scripts/mstack-doctor.sh .
```

In **this** mstack repo: `npm run mstack:doctor`. Manifest typos: `npm run mstack:verify-packs`.

**Cursor:** invoke **`/mstack-doctor`** (skill `.cursor/skills/mstack-doctor/`). Full checklist: [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md).

## New chat bootstrap

- **Prefer:** maintain root **`SESSION_BRIEF.md`** (shape: `templates/SESSION_BRIEF_TEMPLATE.md`). First message: *Read `SESSION_BRIEF.md` and `docs/PROJECT_MEMORY.md`.*
- **Handoff rule:** `@mstack-session-handoff`

## Parallel agents

- **One human** merges the winning diff; avoid two agents editing the same files blindly.
- Have each agent **update `SESSION_BRIEF.md`** or leave a short “next” section so the owner can consolidate.

## Mechanical vs full phases

- **`@mstack-mechanical-pass`** — typos, single-file chores, obvious fixes: 3–5 line inline plan, skip long templates; still obey token discipline and destructive-op gates.
- **Full `mstack-core-workflow`** — auth, migrations, new user-facing behavior, cross-cutting refactors, anything security-sensitive.

## Effectiveness

- [EFFECTIVENESS.md](EFFECTIVENESS.md) — when mstack pays off vs ceremony cost

## See also

- [PLAYBOOK.md](PLAYBOOK.md) — handoff checklist
- [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md) — copy-paste openers
- [ONBOARDING.md](ONBOARDING.md) — packs and first sync
- [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md) — onboarding checklist
