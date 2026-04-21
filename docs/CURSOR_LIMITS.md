# What Cursor project rules cannot do

mstack uses **project rules** (`.cursor/rules/*.mdc`) and **`AGENTS.md`**. These shape **Agent (chat)** behavior but do **not** replace Cursor product limits.

**Map mstack to Cursor features + when to use IDE vs Agent:** [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md)

## Model selection

- **Project rules cannot switch** the chat model, toggle **Auto**, or enforce a provider.
- The user (or team policy) chooses the model in the **Cursor UI**. mstack’s `mstack-model-strategy.mdc` only **suggests** tiers in chat.

## Modes

- **Plan Mode** and **Debug Mode** are **user actions** (mode picker or **Shift+Tab**). Rules can instruct *when* to use them; they do not enable them programmatically.

## Agent vs Tab / inline edit

- **Project rules** and **`AGENTS.md`** apply to **Cursor Agent** in ways described in [Cursor Rules](https://cursor.com/docs/context/rules).
- **Tab** and other IDE AI features are **not** governed the same way: Cursor’s FAQ notes that **User Rules** do not apply to **Inline Edit (Cmd/Ctrl+K)** the same as Agent, and rules generally target Agent workflows. Prefer **Agent + mstack** when you need project rule consistency; use **IDE tools** for fast local edits—see [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md).

## Rule precedence

When guidance conflicts, Cursor applies rules in this order: **Team Rules → Project Rules → User Rules** (see [Rules](https://cursor.com/docs/context/rules)). mstack lives at **project** level; **enforced team rules** take precedence.

## Persistence

- Rules do **not** auto-save full chat history to disk. Durable context comes from **git-tracked files** you maintain (`docs/PROJECT_MEMORY.md`, plans, ADRs, etc.).

## Telemetry and org policy

- Enterprise or team settings may override or add rules. See [Cursor Rules](https://cursor.com/docs/context/rules) and your org’s Cursor documentation.

## Related

- [Cursor base behavior + mstack](CURSOR_BASE_BEHAVIOR.md)
- [Cursor MCP + mstack](CURSOR_MCP.md)
- [Glossary](GLOSSARY.md)
- [Cursor integration (Agent + IDE)](CURSOR_INTEGRATION.md)
- [Debug Mode](https://cursor.com/docs/agent/debug-mode)
- [Plan Mode](https://cursor.com/docs/agent/plan-mode)
