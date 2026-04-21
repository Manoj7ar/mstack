# mstack and Cursor — Agent + IDE surfaces

mstack is a **project rules pack** for **Cursor Agent (chat)**. It works best when you **pick the right Cursor surface** for the job: sometimes the editor is faster; sometimes Agent + Plan/Debug + project rules is safer.

**Limits:** Project rules do **not** control every Cursor feature. See [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

**Full Cursor doc index:** [cursor.com/llms.txt](https://cursor.com/llms.txt)

---

## Cursor × mstack (reference)

| Cursor surface | Official docs | How mstack fits |
| -------------- | ------------- | ---------------- |
| **Project rules** (`.cursor/rules`, `.md` / `.mdc`, globs, apply modes, `@mention`) | [Rules](https://cursor.com/docs/context/rules) | mstack ships `mstack-*.mdc`; core trio `alwaysApply`; specialists use globs or manual `@mention`. |
| **Rule precedence** | [Rules](https://cursor.com/docs/context/rules) (Team Rules section) | **Team → Project → User.** mstack is **project-level**; enforced **team rules** can override—investigate conflicts if behavior surprises you. |
| **`AGENTS.md`** (root + **nested** subdirs) | [Rules](https://cursor.com/docs/context/rules) | Root bootstrap in this repo; in monorepos, nested `AGENTS.md` stacks—merge mstack snippets per area as needed. Practical notes: [MONOREPO.md](MONOREPO.md). |
| **Skills** (`/skill`, `@skill`, `.cursor/skills/`) | [Skills](https://cursor.com/docs/agent/chat/commands) | `/mstack-flight-deck`, `/mstack-doctor`, `/mstack-pack-picker`, `/mstack-lean-handoff`, `/mstack-first-sync`, `/mstack-upgrade-vendor`, `/mstack-context-budget`, `/mstack-ship-check` (see [SKILLS.md](SKILLS.md)). |
| **Plan Mode** (mode picker, **Shift+Tab**) | [Plan Mode](https://cursor.com/docs/agent/plan-mode) | Use for ambiguous / multi-file work; save plans to the **workspace** when useful; align with `templates/PLAN_TEMPLATE.md`. |
| **Debug Mode** | [Debug Mode](https://cursor.com/docs/agent/debug-mode) | Runtime bugs; pair with `mstack-debug.mdc` (consent before invasive logging). |
| **Canvas** | [Canvas](https://cursor.com/docs/agent/tools/canvas) | Visual overview via `/mstack-flight-deck` (Cursor 3.1+). |
| **Remote rule import** (GitHub → `.cursor/rules/imported/`) | [Rules](https://cursor.com/docs/context/rules) | Alternative to vendoring + `sync-mstack.sh`: Cursor pulls rules from a repo; you trade **explicit pack manifests / verify scripts** for **dashboard-managed sync**. Full tradeoffs: [RULES_SOURCE.md](RULES_SOURCE.md). |

---

## Agent vs IDE — when to use which

Use the **smallest surface** that solves the task. mstack rules **complement** Agent; they **do not** replace the debugger, terminal, or normal editing.

| Situation | Prefer | Why |
| --------- | ------ | --- |
| Single-symbol rename, obvious one-line fix, formatting | **IDE** (edit, multi-cursor, formatter, **Tab** if helpful) | Lower latency than a long Agent thread. |
| Small localized change, file already open | **Cmd/Ctrl+K** inline edit or **Tab** | Good for micro-edits; **project rules apply to Agent**, not the same way to Tab / inline edit—see [CURSOR_LIMITS.md](CURSOR_LIMITS.md). |
| Multi-file feature, unclear scope, codebase spelunking | **Agent**, often **Plan Mode** | Research + reviewable plan before a large diff. |
| Runtime bug, needs logs / repro | **Debug Mode** + `mstack-debug.mdc` | Matches Cursor’s instrument → reproduce → fix loop; permission gates still apply. |
| Repeatable team workflows (doctor, pack choice, recap) | **Skills** `/mstack-*` | On-demand procedures without loading everything into every chat. |
| Long thread, handoff | **Files**: `SESSION_BRIEF.md`, `docs/AGENT_RECAP.md` | Cheaper than re-explaining from scratch. |
| Org-wide policy | **Team rules** (Team / Enterprise) | Dashboard rules stack or override project rules—know your precedence. |

**Principle:** **IDE-first** is right for surgical, local work. Use **Agent** when you need **breadth**, **shared project rules**, or **structured phases** (Think → Plan → …). Use **terminal / built-in debugger** when execution or tooling is clearer outside chat.

---

## See also

- [RULES_SOURCE.md](RULES_SOURCE.md) — vendor + sync vs remote import
- [SKILLS.md](SKILLS.md) — `/mstack-*` index
- [CONTEXT_BUDGET.md](CONTEXT_BUDGET.md) — bounded context habits (not auto-trimmed by Cursor)
- [TEAM_ROLLOUT.md](TEAM_ROLLOUT.md) — introducing mstack to a team
- [WHY_MSTACK.md](WHY_MSTACK.md) — one-page pitch + honest limits
- [RECIPES.md](RECIPES.md) — task → `@mention` index
- [TOKEN_LEVERS.md](TOKEN_LEVERS.md) — context habits (narrow `@`, recap files)
- [workflow.md](workflow.md) — mstack phases
- [PACKS.md](PACKS.md) — rule bundles
