---
name: mstack-doctor
description: Run local mstack adoption checks (rules trio, optional pack verify) and point to ADOPTION_AUDIT. Use when the user types /mstack-doctor or asks to audit mstack install in the repo.
disable-model-invocation: true
---

# mstack doctor (skill)

Run bounded checks so the user knows their **mstack** copy is wired correctly.

## When to use

- User invoked **`/mstack-doctor`** or asked to **audit mstack**, **verify rules**, or **check Cursor rules install**.

## Steps

1. From **repo root** (or the user’s app root), run:

   ```bash
   bash scripts/mstack-doctor.sh .
   ```

   - If **`scripts/mstack-doctor.sh`** is missing, the project may use a **vendored** path — try `bash vendor/mstack/scripts/mstack-doctor.sh .` (or ask the user for `MSTACK_ROOT`).

2. If the user wants **pack drift** checked, run with env (adjust paths):

   ```bash
   MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard MSTACK_VERIFY_STRICT=1 bash vendor/mstack/scripts/mstack-doctor.sh .
   ```

   Or run verify directly:

   ```bash
   MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/verify-mstack-sync.sh --strict standard .
   ```

3. Summarize **pass/fail** in chat. Link **`docs/ADOPTION_AUDIT.md`** for a full checklist. For agent-driven gap analysis, suggest **`@mstack-adoption-audit`** if the rule is in their pack.

## Do not

- Change remotes, secrets, or production config as part of “doctor.”
- Assume submodule paths — use the user’s actual `vendor/mstack` or copy location.
