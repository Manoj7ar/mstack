# Context budget (long threads and huge tasks)

Cursor does **not** auto-trim what the Agent sees—you choose **`@` paths**, thread length, and when to start fresh. mstack does **not** add a Cursor product feature here; it gives a **repeatable habit** so exploration stays bounded. See [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

**Invoke in chat:** **`/mstack-context-budget`** for a pasteable budget block. **Explore-first work** can also use **`@mstack-surgical-investigation`** (hypothesis + file cap).

## When to use

- The chat feels **slow**, **repetitive**, or the Agent **re-reads** the same large areas.
- You **over-@** folders or “the whole repo” by default.
- You are **switching chats** and want the next message to be cheap.

## Suggested defaults

| Goal | Max files to open next (typical) | Recap / handoff | Stop condition (example) |
| ---- | -------------------------------- | ----------------- | ------------------------- |
| **Local fix** (path known) | 1–3 | Optional `AGENT_RECAP` | Fix merged + verify command run |
| **Feature** (medium scope) | ≤8 | `SESSION_BRIEF` or `AGENT_RECAP` | Plan agreed + first slice implemented |
| **Spelunk** (unknown) | ≤8 per round | Update recap after each round | Entrypoint + one call chain found |
| **Review / audit** | Bounded by `@` diff or paths | Short notes in recap | Findings list ≤15 lines |

Raise the cap only when **you** widen it—do not let the default become “read everything.”

## Habits that pair well

- [TOKEN_LEVERS.md](TOKEN_LEVERS.md) — narrow `@`, recap files, smaller packs
- [RECIPES.md](RECIPES.md) — pick one primary `@mention` per task
- [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md) — “read recap only” openers

## See also

- [SKILLS.md](SKILLS.md) — **`/mstack-context-budget`**
