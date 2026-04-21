---
name: mstack-pitch-short
description: Emit pasteable short pitches for README, Slack, or social — honest, no fake token savings. Use when the user types /mstack-pitch-short or asks for a blurb, elevator pitch, or tweet-length intro to mstack.
disable-model-invocation: true
---

# mstack pitch short (skill)

Output **copy-paste** text the user can drop into a **README**, **Slack**, **Discord**, or **social** post. **Do not** invent token or speed percentages. Keep tone **confident but honest** — align with [WHY_MSTACK.md](../../docs/WHY_MSTACK.md) and [EFFECTIVENESS.md](../../docs/EFFECTIVENESS.md).

## When to use

- User invoked **`/mstack-pitch-short`** or asked for **one paragraph intro**, **README badge text**, **Slack blurb**, or **how to describe mstack**.

## Steps

1. If **audience** unclear, default to **developers** who already use **Cursor Agent**.

2. Print these blocks (user picks one):

   **README one-liner (neutral)**

   ```text
   [mstack](https://github.com/Manoj7ar/mstack) — Cursor Agent workflow pack: phased work, token discipline, permission gates, optional specialist rules. Copy rules + templates into your repo; see [Starter kit](https://github.com/Manoj7ar/mstack/blob/main/docs/STARTER_KIT.md).
   ```

   **Slack / Discord (~4 sentences)**

   ```text
   We’re using mstack for Cursor Agent — it’s a markdown rules + templates pack (not a separate app). Same playbook for plan → build → review → ship, fewer foot-guns on destructive steps and secrets. It doesn’t pick your model for you; it’s team glue when you actually sync the rules. Install: vendor the repo, run sync + doctor — https://github.com/Manoj7ar/mstack/blob/main/docs/STARTER_KIT.md
   ```

   **Honest caveat line (append if they want transparency)**

   ```text
   Caveat: value shows up when you merge AGENTS.md and pick a pack; tiny repos can start with minimal/lite. See https://github.com/Manoj7ar/mstack/blob/main/docs/EFFECTIVENESS.md
   ```

3. **Link** — Longer comparison vs “only user rules”: [SHARE_AND_COMPARE.md](../../docs/SHARE_AND_COMPARE.md). Badge snippets: [BADGE.md](../../docs/BADGE.md).

## Do not

- Promise guaranteed token or cost reduction.
- Claim mstack replaces security or legal review.
