# mstack rule packs

Presets for copying **`mstack-*.mdc`** into another repo. Names match [`README.md`](../README.md) guidance.

**Machine-readable lists** (for `scripts/sync-mstack.sh` and `scripts/verify-mstack-sync.sh`): [`scripts/packs/minimal.txt`](../scripts/packs/minimal.txt), [`lite.txt`](../scripts/packs/lite.txt), [`solo.txt`](../scripts/packs/solo.txt), [`standard.txt`](../scripts/packs/standard.txt), [`full.txt`](../scripts/packs/full.txt).

## Verify sync (CI / local)

After syncing, prove `.cursor/rules` matches the pack (from **consumer repo** root):

```bash
MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/verify-mstack-sync.sh standard
# Fail if stray rules exist (drift detection):
MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/verify-mstack-sync.sh --strict standard
```

**Local sanity** (required trio + optional pack verify): `bash vendor/mstack/scripts/mstack-doctor.sh .` — with `MSTACK_ROOT`, `MSTACK_PACK`, and `MSTACK_VERIFY_STRICT=1` also runs `verify-mstack-sync.sh`. See [POWER_USER.md](POWER_USER.md).

**CI template:** copy [`.github/workflows/mstack-pack-verify.yml.example`](../.github/workflows/mstack-pack-verify.yml.example) to `.github/workflows/mstack-pack-verify.yml` and adjust submodule path and pack name.

Use pack `all` to assert every `mstack-*.mdc` from the mstack checkout is present in the consumer. See [POWER_USER.md](POWER_USER.md).

## Sync from a vendored checkout

From your **app repo** root (with mstack at `vendor/mstack`):

```bash
# Standard pack + bootstrap PROJECT_MEMORY if missing
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard INIT_PROJECT_MEMORY=1 vendor/mstack/scripts/sync-mstack.sh

# Rules only (no templates)
MSTACK_ROOT=vendor/mstack MSTACK_PACK=lite SYNC_TEMPLATES=0 vendor/mstack/scripts/sync-mstack.sh
```

- **`MSTACK_PACK`:** `minimal` | `lite` | `solo` | `standard` | `full` | `all` (default **`all`** = every `mstack-*.mdc`, backward compatible).
- **`SYNC_TEMPLATES`:** `1` (default) or `0` to skip `templates/*.md`.
- **`INIT_PROJECT_MEMORY`:** `1` creates `docs/PROJECT_MEMORY.md` from the template only if it does not exist.

## Minimal (3 files)

Core safety and workflow only.

- `mstack-core-workflow.mdc`
- `mstack-token-discipline.mdc`
- `mstack-permissions.mdc`

## Lite (5 files)

**Minimal** plus session handoff and model strategy—good for **solo / small** repos that want continuity and cost hints without the full Standard set.

- `mstack-core-workflow.mdc`
- `mstack-token-discipline.mdc`
- `mstack-permissions.mdc`
- `mstack-session-handoff.mdc`
- `mstack-model-strategy.mdc`

## Solo power (7 files)

**Lite** plus **project memory** and **mechanical pass**—solo developers who want durable prefs and a turbo path without the full Standard specialist set.

- `mstack-core-workflow.mdc`
- `mstack-token-discipline.mdc`
- `mstack-permissions.mdc`
- `mstack-session-handoff.mdc`
- `mstack-model-strategy.mdc`
- `mstack-project-memory.mdc`
- `mstack-mechanical-pass.mdc`

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
- `mstack-secrets-env.mdc` (`.env`, CI workflows, compose; no secrets in git)
- `mstack-docs-devx.mdc`
- `mstack-ci-quality.mdc`
- `mstack-dependencies.mdc`
- `mstack-feature-flags.mdc` (rollouts, kill switches, flag hygiene)
- `mstack-model-strategy.mdc`
- `mstack-session-handoff.mdc`
- `mstack-project-memory.mdc`
- `mstack-mechanical-pass.mdc` (compress phases for chores; see rule body)

## Full (everything in this repository)

**All of Standard, plus:**

- `mstack-design-research.mdc`
- `mstack-privacy-data-handling.mdc` (retention, export/delete, minimization; not legal advice)
- `mstack-open-source-license.mdc` (`LICENSE`, `NOTICE`, third-party; not legal advice)
- `mstack-data-modeling.mdc`
- `mstack-data-migrations.mdc`
- `mstack-ci.mdc`
- `mstack-docs-ship.mdc`
- `mstack-web-performance.mdc`
- `mstack-ai-product.mdc`
- `mstack-api-contracts.mdc`
- `mstack-observability.mdc`
- `mstack-release-versioning.mdc`
- `mstack-i18n-localization.mdc` (locales, catalogs, ICU/MessageFormat)
- `mstack-product-review.mdc`
- `mstack-documentation-pass.mdc`
- `mstack-repo-memory.mdc` (only if you are **vendoring from this repo** and keep `docs/AGENT_MEMORY` pattern; skip in generic app repos)
- `mstack-adoption-audit.mdc` (walk **`docs/ADOPTION_AUDIT.md`** in workspace; **`@mstack-adoption-audit`**)

**Note:** Add **`docs/PROJECT_MEMORY.md`** (copy from `templates/PROJECT_MEMORY_TEMPLATE.md`) in **consumer** repos when using `mstack-project-memory.mdc`. Copy **`docs/ONBOARDING.md`**, **`PLAYBOOK.md`**, etc., if you want the same navigation docs in your app repo.

## Templates

Copy **`templates/*.md`** for the presets you use; at minimum match templates referenced in `mstack-core-workflow.mdc` and your chosen specialists. See README **Templates** table.

## Custom

Start from **Standard**, add domain rules (e.g. only `mstack-ai-product` if you ship LLM features). To drop one of a **pair** of overlapping specialists, see **[SPECIALIST_MAP.md](SPECIALIST_MAP.md)** (e.g. `mstack-ci` vs `mstack-ci-quality`, `mstack-docs-devx` vs `mstack-docs-ship`).

### Product and docs (optional add-ons)

For GStack-style **product challenge** before a big plan, and a **documentation pass** before ship:

- `mstack-product-review.mdc` — use with `templates/PRODUCT_REVIEW_TEMPLATE.md` (and `templates/RISK_REGISTER_TEMPLATE.md` if needed)
- `mstack-documentation-pass.mdc` — use with `templates/DOC_TASK_TEMPLATE.md`
