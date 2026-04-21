# mstack Cursor skills (`/mstack-*`)

Skills are **explicit-invocation** procedures in Agent chat. They complement **project rules** (`.cursor/rules/*.mdc`). Official overview: [Skills](https://cursor.com/docs/agent/chat/commands).

| Command | Purpose | Skill file |
| ------- | ------- | ---------- |
| **`/mstack-flight-deck`** | Canvas overview: phases, docs, optional Ideas API snapshot (Cursor 3.1+) | [.cursor/skills/mstack-flight-deck/SKILL.md](../.cursor/skills/mstack-flight-deck/SKILL.md) |
| **`/mstack-doctor`** | Local install check: required rules + optional strict pack verify | [.cursor/skills/mstack-doctor/SKILL.md](../.cursor/skills/mstack-doctor/SKILL.md) |
| **`/mstack-pack-picker`** | Recommend **`MSTACK_PACK`** from a short Q&A | [.cursor/skills/mstack-pack-picker/SKILL.md](../.cursor/skills/mstack-pack-picker/SKILL.md) |
| **`/mstack-lean-handoff`** | Write compact **`docs/AGENT_RECAP.md`** from the thread | [.cursor/skills/mstack-lean-handoff/SKILL.md](../.cursor/skills/mstack-lean-handoff/SKILL.md) |
| **`/mstack-first-sync`** | Copy-paste **sync + doctor** for first-time adoption in another repo | [.cursor/skills/mstack-first-sync/SKILL.md](../.cursor/skills/mstack-first-sync/SKILL.md) |
| **`/mstack-upgrade-vendor`** | Copy-paste **submodule/update → re-sync → doctor** after bumping mstack | [.cursor/skills/mstack-upgrade-vendor/SKILL.md](../.cursor/skills/mstack-upgrade-vendor/SKILL.md) |

**Note:** Skills do **not** change Cursor’s model or modes—see [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

## See also

- [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md) — Agent vs IDE, rules precedence
- [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md) — copy-paste openers that reference these commands
