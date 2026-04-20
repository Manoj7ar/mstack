# GStack inspiration (mstack is not a fork)

[mstack](../README.md) is **independent** content for **Cursor** (`.cursor/rules`, `AGENTS.md`, templates). It is **inspired by** the idea of a **structured, multi-role workflow** popularized by **[GStack](https://github.com/garrytan/gstack)** and similar “virtual team” setups for Claude Code.

We **do not** copy GStack prompts or slash commands. Below is an **honest mapping** so you know where to look in mstack for a similar *intent*.

## Concept mapping

| GStack-style idea | What to use in mstack |
| ----------------- | --------------------- |
| Phased sprint (think → plan → build → …) | `mstack-core-workflow.mdc`, [workflow.md](workflow.md), [PLAYBOOK.md](PLAYBOOK.md) |
| CEO / product challenge before build | `templates/PRODUCT_REVIEW_TEMPLATE.md`, `@mstack-product-review` (`mstack-product-review.mdc`) |
| Engineering / architecture rigor | `templates/PLAN_TEMPLATE.md`, `templates/ADR_TEMPLATE.md`, `@mstack-data-modeling`, backend rules |
| Code review (no new features in review pass) | `mstack-review.mdc` |
| QA / testing | `mstack-testing-qa.mdc`, `templates/TEST_PLAN_TEMPLATE.md` |
| Security pass | `mstack-security-review.mdc` |
| Docs / ship hygiene | `mstack-docs-devx.mdc`, `mstack-docs-ship.mdc`, `templates/DOC_TASK_TEMPLATE.md`, `@mstack-documentation-pass` |
| Debug / root cause | `mstack-debug.mdc`, Cursor **Debug Mode** |
| Token / context discipline | `mstack-token-discipline.mdc`, `mstack-session-handoff.mdc` |
| Durable product/design memory | `docs/PROJECT_MEMORY.md`, `mstack-project-memory.mdc` |

## Product differences

- **Cursor** loads **project rules** and **AGENTS.md**; there is no built-in “slash command” namespace like some Claude Code setups—use **`@rule-name`** and [Plan/Debug modes](https://cursor.com/docs/agent/plan-mode) instead.
- **Model choice** is always user-controlled; `mstack-model-strategy.mdc` only **advises**.

## Further reading

- Upstream inspiration: [github.com/garrytan/gstack](https://github.com/garrytan/gstack)
- Cursor rules: [cursor.com/docs/rules](https://cursor.com/docs/rules)
