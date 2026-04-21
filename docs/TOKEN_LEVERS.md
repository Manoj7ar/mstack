# Token levers (honest)

Project rules **cannot** shrink your Cursor bill automatically or switch models. See [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

Here, **“saving tokens”** means **less wasted context**: fewer broad reads, wrong paths, duplicate explanations, and oversized logs in chat.

## What usually reduces waste

| Lever | Why it helps |
| ----- | ------------- |
| **Narrow `@` context** | Agent sees fewer files; you steer what matters. |
| **Search before wide reads** | Find the right file first; align with `mstack-token-discipline`. |
| **`SESSION_BRIEF.md` + recap files** | Next chat does not re-derive the whole thread. See `templates/SESSION_BRIEF_TEMPLATE.md`, `templates/AGENT_RECAP_TEMPLATE.md`. |
| **`@mstack-mechanical-pass`** | Short plan for chores; skip long phase templates. |
| **Smaller packs** | Fewer always-on instructions; see [PACKS.md](PACKS.md). Avoid **Full** until you need those specialists. |
| **`@mstack-surgical-investigation`** (standard+) | Hypothesis and file budget before spelunking. |
| **`/mstack-lean-handoff`** | Writes a compact recap before you switch chats. |

## What does not help (by itself)

- Expecting rules to **guarantee** lower usage numbers.
- Loading **every** specialist rule “just in case.”
- Pasting **full** logs or multi-hundred-line files without a narrow question.

## How to self-check

- Use Cursor **Usage** (or your workspace usage view) for trends—not precise A/B without controlling the task.
- Run the **same class of task** twice: once without recap, once after maintaining `SESSION_BRIEF` / `AGENT_RECAP`; compare how much re-exploration happens (subjective but real).

## See also

- [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md) — Agent vs IDE, Skills, modes
- [EFFECTIVENESS.md](EFFECTIVENESS.md) — when mstack pays off vs ceremony
- [POWER_USER.md](POWER_USER.md) — CI, session brief, mechanical pass
- [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md) — low-token openers
