# mstack rule packs

Presets for copying **`mstack-*.mdc`** into another repo. Names match [`README.md`](../README.md) guidance.

## Minimal (3 files)

Core safety and workflow only.

- `mstack-core-workflow.mdc`
- `mstack-token-discipline.mdc`
- `mstack-permissions.mdc`

## Standard (minimal + common product work)

Add specialists most teams hit daily.

**All of Minimal, plus:**

- `mstack-frontend.mdc`
- `mstack-accessibility.mdc`
- `mstack-backend.mdc`
- `mstack-testing-qa.mdc`
- `mstack-review.mdc`
- `mstack-debug.mdc`
- `mstack-security-review.mdc`
- `mstack-docs-devx.mdc`
- `mstack-ci-quality.mdc`
- `mstack-dependencies.mdc`
- `mstack-model-strategy.mdc`
- `mstack-session-handoff.mdc`

## Full (everything in this repository)

**All of Standard, plus:**

- `mstack-design-research.mdc`
- `mstack-data-modeling.mdc`
- `mstack-data-migrations.mdc`
- `mstack-ci.mdc`
- `mstack-docs-ship.mdc`
- `mstack-web-performance.mdc`
- `mstack-ai-product.mdc`
- `mstack-api-contracts.mdc`
- `mstack-observability.mdc`
- `mstack-release-versioning.mdc`
- `mstack-repo-memory.mdc` (only if you are **vendoring from this repo** and keep `docs/AGENT_MEMORY` pattern; skip in generic app repos)

## Templates

Copy **`templates/*.md`** for the presets you use; at minimum match templates referenced in `mstack-core-workflow.mdc` and your chosen specialists. See README **Templates** table.

## Custom

Start from **Standard**, add domain rules (e.g. only `mstack-ai-product` if you ship LLM features), remove overlapping pairs if you prefer one of `mstack-ci` vs `mstack-ci-quality` or `mstack-docs-devx` vs `mstack-docs-ship`.
