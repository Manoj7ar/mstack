# Why mstack?

A **one-page** answer for visitors deciding whether to try this repo. For install steps, use [STARTER_KIT.md](STARTER_KIT.md). For honesty about limits, see [EFFECTIVENESS.md](EFFECTIVENESS.md) and [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

## Who it is for

- **Teams** that want **shared** Cursor Agent habits: phases, handoffs, permission gates, optional specialists.
- **Solo devs** who want **lite** packs, recap files, and less ceremony on chores—without giving up structure when risk is high.

## What it is

- **Markdown + `.mdc` rules** you vendor into a project, plus **`AGENTS.md`**, **templates**, and **`/mstack-*` skills** (see [SKILLS.md](SKILLS.md)).
- **Pack manifests** so “which rules are installed” is explicit and **verifiable** (`verify-mstack-sync.sh`, `mstack-doctor`).

## What it is not

- **Not** a Cursor product patch—rules **cannot** switch your model, force Plan/Debug Mode, or auto-save full chat history ([CURSOR_LIMITS.md](CURSOR_LIMITS.md)).
- **Not** guaranteed cheaper usage—sometimes you save wasted exploration; sometimes phases add confirmation turns ([EFFECTIVENESS.md](EFFECTIVENESS.md)).

## Three concrete outcomes people cite

1. **Same playbook** — Think → Plan → Build → Review → Test → Ship → Reflect, with templates linked from [workflow.md](workflow.md).
2. **Fewer foot-guns** — Destructive git/DB/prod steps go through **`mstack-permissions`**; secrets/env nudges via **`mstack-secrets-env`**.
3. **Drift resistance** — Optional strict sync check so `.cursor/rules` matches the **pack** you think you use ([POWER_USER.md](POWER_USER.md)).

## Raw Agent vs mstack (honest)

| | Typical “just chat” Agent | With mstack |
| - | ------------------------- | ----------- |
| **Consistency** | Varies by person and day | Shared phases + optional `@mention` specialists |
| **Safety posture** | Ad hoc | Permissions + optional security/docs templates |
| **Onboarding** | Explain the repo each time | `SESSION_BRIEF`, `AGENT_RECAP`, [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md) |
| **Magic** | Feels fast until it isn’t | Same Cursor limits; you still choose model and modes |

No fake “% faster” claims—try a **pilot pack** and see if your **team** ships with less thrash.

## Alternatives (factual)

- **Cursor project rules only** — You can maintain a few `.mdc` files yourself without mstack; you trade **pack manifests**, **verify scripts**, and **this doc set** for less to sync.
- **GStack / Claude-oriented workflows** — Popular in other tools; mstack is **Cursor-native** (`.cursor/rules`, `AGENTS.md`). See [GSTACK_INSPIRATION.md](GSTACK_INSPIRATION.md).
- **Remote rule import** — Cursor can pull rules from GitHub without a submodule; see [RULES_SOURCE.md](RULES_SOURCE.md) for tradeoffs vs `sync-mstack.sh`.
- **Team `AGENTS.md` only** — Works for bootstrap; you still may want **specialists** and **templates** for security, API, and ship discipline.

## Try it

- [STARTER_KIT.md](STARTER_KIT.md) — fastest path in another repo  
- [SKILLS.md](SKILLS.md) — `/mstack-first-sync`, `/mstack-ship-check`, etc.  
- [SHOWCASE.md](SHOWCASE.md) — add your project when you adopt  
- [DOCS_MAP.md](DOCS_MAP.md) — next pages to read by role  
