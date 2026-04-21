---
name: mstack-first-sync
description: Guided first-time sync of mstack into a consumer repo — copy-paste commands for sync-mstack.sh, optional AGENTS snippet, doctor, and links to STARTER_KIT. Use when the user types /mstack-first-sync or asks how to install mstack in their project.
disable-model-invocation: true
---

# mstack first sync (skill)

Help the user **adopt mstack** in **their app repo** with **copy-paste shell** — do **not** run destructive commands or write files unless they explicitly ask.

## When to use

- User invoked **`/mstack-first-sync`** or asked **how to install**, **first sync**, **vendor mstack**, or **which command to run**.

## Steps

1. **Confirm paths** — Ask once if unclear: Is mstack at **`vendor/mstack`**, a **sibling folder**, or **this** repo (mstack checkout)? Consumer root = where `.cursor/rules` should land.

2. **Pack** — If unknown, suggest **`/mstack-pack-picker`** or skim **[`docs/PACKS.md`](../../docs/PACKS.md)** (`minimal` / `lite` / `solo` / `standard` / `full`). Default suggestion for “typical app”: **`standard`**.

3. **Print sync block** (adjust `MSTACK_ROOT`):

   ```bash
   chmod +x "${MSTACK_ROOT:-vendor/mstack}/scripts/sync-mstack.sh"
   MSTACK_ROOT="${MSTACK_ROOT:-vendor/mstack}" MSTACK_PACK="${MSTACK_PACK:-standard}" INIT_PROJECT_MEMORY=1 \
     "${MSTACK_ROOT:-vendor/mstack}/scripts/sync-mstack.sh"
   ```

   Mention options: **`SYNC_TEMPLATES=0`**, **`SYNC_AGENTS_SNIPPET=1`** (writes `AGENTS.md.mstack-snippet` for manual merge).

4. **Print verify** (adjust paths):

   ```bash
   bash "${MSTACK_ROOT:-vendor/mstack}/scripts/mstack-doctor.sh" .
   MSTACK_ROOT="${MSTACK_ROOT:-vendor/mstack}" MSTACK_PACK="${MSTACK_PACK:-standard}" MSTACK_VERIFY_STRICT=1 \
     bash "${MSTACK_ROOT:-vendor/mstack}/scripts/mstack-doctor.sh" .
   ```

5. **Point to docs** — **[`docs/STARTER_KIT.md`](../../docs/STARTER_KIT.md)** (canonical one-pager), [`docs/PLAYBOOK_FIRST_MESSAGES.md`](../../docs/PLAYBOOK_FIRST_MESSAGES.md), **`/mstack-doctor`** after files exist.

## Do not

- Assume **`vendor/mstack`** without checking.
- Run **`sync-mstack.sh`** into the wrong directory or overwrite without confirmation.
- Promise token savings or model changes — see [`docs/CURSOR_LIMITS.md`](../../docs/CURSOR_LIMITS.md).
