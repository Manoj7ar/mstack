---
name: mstack-upgrade-vendor
description: Refresh mstack after updating vendor/submodule — copy-paste submodule pull, re-sync, doctor, strict verify. Use when the user types /mstack-upgrade-vendor or asks how to upgrade vendored mstack.
disable-model-invocation: true
---

# mstack upgrade vendor (skill)

Print an **ordered checklist** for refreshing **mstack** in a **consumer repo**. Do **not** run git or sync unless the user asks; **no** automatic file writes.

## When to use

- User invoked **`/mstack-upgrade-vendor`** or asked **upgrade mstack**, **update submodule**, **refresh rules after pull**, **sync after vendor bump**.

## Steps

1. **Confirm `MSTACK_ROOT`** — Default **`vendor/mstack`**; ask if mstack lives elsewhere.

2. **Confirm `MSTACK_PACK`** — Same pack as install ([`docs/PACKS.md`](../../docs/PACKS.md)). If unknown, suggest **`/mstack-pack-picker`**.

3. **Print refresh + sync** (user runs in **app root**):

   ```bash
   # If submodule (adjust path)
   git submodule update --remote "${MSTACK_ROOT:-vendor/mstack}"

   chmod +x "${MSTACK_ROOT:-vendor/mstack}/scripts/sync-mstack.sh"
   MSTACK_ROOT="${MSTACK_ROOT:-vendor/mstack}" MSTACK_PACK="${MSTACK_PACK:-standard}" INIT_PROJECT_MEMORY=1 \
     "${MSTACK_ROOT:-vendor/mstack}/scripts/sync-mstack.sh"
   ```

   Note: **`SYNC_TEMPLATES=0`** only if they want rules + skills without overwriting **`templates/`**.

4. **Print merge reminder** — Re-merge **`AGENTS.md`** if upstream changed; skim **[`CHANGELOG.md`](../../CHANGELOG.md)** in the mstack checkout for adopter-facing changes.

5. **Print verify**:

   ```bash
   bash "${MSTACK_ROOT:-vendor/mstack}/scripts/mstack-doctor.sh" .
   MSTACK_ROOT="${MSTACK_ROOT:-vendor/mstack}" MSTACK_PACK="${MSTACK_PACK:-standard}" MSTACK_VERIFY_STRICT=1 \
     bash "${MSTACK_ROOT:-vendor/mstack}/scripts/mstack-doctor.sh" .
   ```

6. **Link** — Full narrative: [`docs/VENDOR_UPGRADE.md`](../../docs/VENDOR_UPGRADE.md).

## Do not

- Force **`git checkout`** or destructive git without **`mstack-permissions`** / user confirmation.
- Promise new Cursor product behavior — see [`docs/CURSOR_LIMITS.md`](../../docs/CURSOR_LIMITS.md).
