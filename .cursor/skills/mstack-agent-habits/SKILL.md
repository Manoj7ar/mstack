---
name: mstack-agent-habits
description: Emit a pasteable Agent kickoff block — micro-updates, bounded parallel reads, mstack hooks (memory, permissions, ship-check). Use when the user types /mstack-agent-habits or wants Cursor-default-style habits plus mstack discipline.
disable-model-invocation: true
---

# mstack agent habits (skill)

Output a **short, pasteable** block for **Agent** chat (kickoff or mid-thread reset). **Do not** write files unless the user asks. This **does not** change Cursor’s model or base system prompt — see [`docs/CURSOR_BASE_BEHAVIOR.md`](../../docs/CURSOR_BASE_BEHAVIOR.md) and [`docs/CURSOR_LIMITS.md`](../../docs/CURSOR_LIMITS.md).

## When to use

- User invoked **`/mstack-agent-habits`** or asked for **Agent kickoff habits**, **progress note cadence**, or **how to align with Cursor + mstack**.

## Steps

1. If **task type** is unclear, ask one question: fix vs feature vs spelunk vs review.

2. **Print pasteable block** (user fills brackets):

   ```text
   Agent + mstack: Run until [one-line goal] or stop if blocked.
   Before each batch of tool use: one-line progress note (what now / next).
   Read budget: at most [3–5] parallel read-only operations per batch unless output of A is required for B.
   @-mention only: [narrow paths]. Read first if present: docs/PROJECT_MEMORY.md, SESSION_BRIEF.md, docs/AGENT_RECAP.md.
   Follow mstack-token-discipline; state-of-world ≤15 lines after exploration before big edits.
   Permissions: mstack-permissions (destructive/prod); mstack-debug — ask before invasive logging.
   If stuck or high blast radius: Plan Mode + templates/PLAN_TEMPLATE.md.
   Before PR: /mstack-ship-check (and BREAKING_CHANGE checklist if applicable).
   ```

3. **Link** — Full layering + Chat vs Agent: [`docs/CURSOR_BASE_BEHAVIOR.md`](../../docs/CURSOR_BASE_BEHAVIOR.md). Context caps: [`/mstack-context-budget`](../../docs/SKILLS.md).

## Do not

- Paste or paraphrase long **verbatim** Cursor system prompts.
- Promise behavior that only Cursor product updates can guarantee.
