# What Cursor project rules cannot do

mstack uses **project rules** (`.cursor/rules/*.mdc`) and `**AGENTS.md`**. These shape Agent behavior but do **not** replace Cursor product limits.

## Model selection

- **Project rules cannot switch** the chat model, toggle **Auto**, or enforce a provider.
- The user (or team policy) chooses the model in the **Cursor UI**. mstack’s `mstack-model-strategy.mdc` only **suggests** tiers in chat.

## Modes

- **Plan Mode** and **Debug Mode** are **user actions** (mode picker or **Shift+Tab**). Rules can instruct *when* to use them; they do not enable them programmatically.

## Persistence

- Rules do **not** auto-save full chat history to disk. Durable context comes from **git-tracked files** you maintain (`docs/PROJECT_MEMORY.md`, plans, ADRs, etc.).

## Telemetry and org policy

- Enterprise or team settings may override or add rules. See [Cursor Rules](https://cursor.com/docs/rules) and your org’s Cursor documentation.

## Related

- [Debug Mode](https://cursor.com/docs/agent/debug-mode)
- [Plan Mode](https://cursor.com/docs/agent/plan-mode)