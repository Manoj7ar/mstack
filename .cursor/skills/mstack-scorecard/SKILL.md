---
name: mstack-scorecard
description: Print copy-paste commands for the mstack adoption scorecard — 0-100 install health, band, warnings, and next steps. Use when the user types /mstack-scorecard or asks whether mstack is installed well.
disable-model-invocation: true
---

# mstack scorecard (skill)

Emit a **short, pasteable** block for checking mstack adoption quality in a repo. Do **not** edit files or run commands unless the user asks.

## When to use

- User invoked **`/mstack-scorecard`**.
- User asks whether mstack is **installed correctly**, **adopted well**, **drifting**, or **worth using** in a repo.

## Steps

1. If paths are unclear, ask once:
   - Consumer repo root?
   - mstack checkout path (`vendor/mstack`, sibling folder, or current repo)?
   - Expected pack (`minimal`, `lite`, `solo`, `standard`, `full`, `all`)?

2. Print this block, adjusted to the user’s paths:

   ```bash
   # From the consumer repo root
   MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard \
     bash vendor/mstack/scripts/mstack-scorecard.sh .

   # Strict pack drift check (optional)
   MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard MSTACK_VERIFY_STRICT=1 \
     bash vendor/mstack/scripts/mstack-scorecard.sh .

   # Machine-readable output (optional)
   MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard MSTACK_SCORE_JSON=1 \
     bash vendor/mstack/scripts/mstack-scorecard.sh .
   ```

3. Explain bands briefly:
   - **90–100 excellent** — ready for team use
   - **70–89 good** — useful, minor gaps
   - **40–69 partial** — installed but likely inconsistent
   - **0–39 not installed** — start with `/mstack-first-sync`

4. Link:
   - [`docs/ADOPTION_SCORECARD.md`](../../docs/ADOPTION_SCORECARD.md)
   - [`docs/STARTER_KIT.md`](../../docs/STARTER_KIT.md)
   - [`docs/ADOPTION_AUDIT.md`](../../docs/ADOPTION_AUDIT.md)

## Do not

- Treat the score as proof of productivity or token savings.
- Modify user repos without explicit request.
