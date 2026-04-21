# Upgrading a vendored mstack copy

Use this when mstack lives **inside your app repo** (submodule, subtree, or copied folder) and you want **new rules, templates, or skills** without guessing commands.

**Related:** [STARTER_KIT.md](STARTER_KIT.md) (first install), [TROUBLESHOOTING.md](TROUBLESHOOTING.md) (drift). In Agent: **`/mstack-upgrade-vendor`** for copy-paste steps.

## 1. Refresh the upstream checkout

**Submodule** (common):

```bash
git submodule update --remote vendor/mstack
# or: cd vendor/mstack && git fetch && git checkout <tag-or-branch> && cd ../..
```

**Fork / copy:** pull or copy the new mstack tree into the same path you use as **`MSTACK_ROOT`**.

## 2. Re-sync into your consumer tree

From **your app repo root**, use the **same `MSTACK_PACK`** you chose at install (see [PACKS.md](PACKS.md)):

```bash
chmod +x vendor/mstack/scripts/sync-mstack.sh
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard INIT_PROJECT_MEMORY=1 vendor/mstack/scripts/sync-mstack.sh
```

- **`SYNC_TEMPLATES=0`** if you only want refreshed `.cursor/rules` and `.cursor/skills`.
- **`INIT_PROJECT_MEMORY=1`** is safe: it only creates `docs/PROJECT_MEMORY.md` if missing.

## 3. Merge discipline

- **`AGENTS.md`:** If upstream mstack changed **`AGENTS.md`**, diff **`vendor/mstack/AGENTS.md`** (or the snippet from **`SYNC_AGENTS_SNIPPET=1`**) and **merge** into your root **`AGENTS.md`**—do not blindly overwrite your project instructions.
- **`CHANGELOG.md`** (in mstack): skim **Unreleased** / latest version for **new rules, templates, or breaking adopter notes**.

## 4. Verify

```bash
bash vendor/mstack/scripts/mstack-doctor.sh .
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard MSTACK_VERIFY_STRICT=1 bash vendor/mstack/scripts/mstack-doctor.sh .
```

Optional drift-only: `MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/verify-mstack-sync.sh --strict standard .`

## 5. Optional checks

- [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md) — quarterly pass.
- [RECIPES.md](RECIPES.md) — new `@mention` patterns for fresh templates.
