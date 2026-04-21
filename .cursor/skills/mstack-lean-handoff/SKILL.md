---
name: mstack-lean-handoff
description: Write a compact AGENT_RECAP from the current thread for cheap continuity; optional pointer to SESSION_BRIEF for full chat switches. Use when the user types /mstack-lean-handoff or asks for a recap file before switching context.
disable-model-invocation: true
---

# mstack lean handoff

Produce a **short, file-based** handoff so the next message can be low-token: *read recap only, then continue.*

## When to use

- User invoked **`/mstack-lean-handoff`** or asked for a **recap**, **checkpoint**, or **handoff file** without a full sprint brief.

## Steps

1. Read **`templates/AGENT_RECAP_TEMPLATE.md`** and create or update **`docs/AGENT_RECAP.md`** (or **`AGENT_RECAP.md`** at repo root if the project prefers root—ask once if unclear).
2. Fill from **chat + repo reality**: goal, **paths touched** (no paste walls), decisions, open questions, next step, verify command.
3. If the user is **starting a new Cursor chat** or **parallel agent**, recommend also refreshing **`SESSION_BRIEF.md`** via **`templates/SESSION_BRIEF_TEMPLATE.md`** and rule **`@mstack-session-handoff`** — recap alone is thinner than a full brief.
4. Tell the user the **exact first line** to paste next, e.g. *Read `docs/AGENT_RECAP.md` only, then …*

## Do not

- Dump the entire conversation into the file.
- Replace **`SESSION_BRIEF.md`** when the team policy is “full handoff always”—add recap as **supplement** only.

## See also

- `docs/TOKEN_LEVERS.md` — why recap files help
- `docs/PLAYBOOK_FIRST_MESSAGES.md` — copy-paste openers
