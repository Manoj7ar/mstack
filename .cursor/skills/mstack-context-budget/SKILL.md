---
name: mstack-context-budget
description: Emit a pasteable context budget for Agent chat — narrow @ paths, file cap N≤8, stop condition, recap line. Use when the user types /mstack-context-budget or asks to reduce context, shrink scope, or start a fresh chat cheaply.
disable-model-invocation: true
---

# mstack context budget (skill)

Output a **short, pasteable** block the user can drop into **the same or a new** Agent message. **Do not** write files unless the user asks. This does **not** change Cursor’s model or auto-trim context—see [`docs/CURSOR_LIMITS.md`](../../docs/CURSOR_LIMITS.md).

## When to use

- User invoked **`/mstack-context-budget`** or asked to **limit context**, **budget files**, **start fresh cheaply**, or **stop the agent reading everything**.

## Steps

1. **Task type** — If unclear, ask one question: local fix vs feature vs spelunk vs review.

2. **Suggest N** — Default **N ≤ 8** files for the **next** read batch; **1–3** if the user already named paths. User may override N in the pasted block.

3. **Print pasteable block** (fill brackets from chat):

   ```text
   Context budget: open at most [N] files before stopping. @-mention only: [paths or dirs].
   Read [docs/AGENT_RECAP.md or SESSION_BRIEF.md] only first if present, then continue.
   Stop when: [one sentence — e.g. found entrypoint + one callsite].
   Follow mstack-token-discipline; no duplicate megapastes.
   ```

4. **Optional** — If explore-first: suggest **`@mstack-surgical-investigation`** instead or in round two.

5. **Link** — Full defaults table: [`docs/CONTEXT_BUDGET.md`](../../docs/CONTEXT_BUDGET.md). Fresh-chat lines: [`docs/PLAYBOOK_FIRST_MESSAGES.md`](../../docs/PLAYBOOK_FIRST_MESSAGES.md).

## Do not

- Promise automatic token or billing reduction.
- Open or sync files without user direction.
