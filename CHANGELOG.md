# Changelog

All notable changes to the **mstack pack** (rules, templates, packs, scripts, docs) are documented here. The optional **Ideas API** version may be noted when it changes materially.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning is **semver-ish** for the pack as a whole (major = breaking adopter expectations, minor = additive rules/docs, patch = fixes).

## [Unreleased]

### Added

- **Wave 10 (discovery + team adoption):** `docs/TEAM_ROLLOUT.md`, `docs/RULES_SOURCE.md` (vendor + sync vs Cursor remote import), `docs/SKILLS.md` (`/mstack-*` index); FAQ + SHOWCASE + ONBOARDING + CURSOR_INTEGRATION + README / AGENTS / AGENT_MEMORY / workflow / STARTER_KIT wiring. **No** new GitHub Actions, pack entries, or `alwaysApply` rules.
- **Wave 9 (post-adoption):** `docs/VENDOR_UPGRADE.md`, **`/mstack-upgrade-vendor`** skill; `docs/MONOREPO.md`; `docs/RECIPES.md` (task → rule → template); `templates/HOTFIX_OR_ROLLBACK_CHECKLIST.md`; wiring across README, STARTER_KIT, TROUBLESHOOTING, ONBOARDING, FAQ, EFFECTIVENESS, SPECIALIST_MAP, workflow, PLAYBOOK_FIRST_MESSAGES, CURSOR_INTEGRATION, AGENT_MEMORY, `mstack-core-workflow.mdc`, AGENTS. **No** new pack entries or `alwaysApply` rules.
- **Wave 8 (adoption):** `docs/STARTER_KIT.md` (one-page sync, doctor, first messages); **`/mstack-first-sync`** skill (`.cursor/skills/mstack-first-sync/`); `templates/MSTACK_DAY_ONE_CHECKLIST.md`; FAQ “first 10 minutes,” SHOWCASE README snippet, EFFECTIVENESS + ADOPTION_AUDIT wiring; README / ONBOARDING / AGENTS / AGENT_MEMORY / workflow / PLAYBOOK_FIRST_MESSAGES updates. **No** new rule packs or `alwaysApply` rules.

### Removed

- **GitHub Actions** workflows `mstack-ci.yml` and `mstack-ci-smoke.yml` — use **`npm run mstack:ci`** locally and optional **`mstack-pack-verify.yml.example`** in consumer repos.

### Added (earlier unreleased)

- **Cursor integration:** `docs/CURSOR_INTEGRATION.md` (Rules, Skills, modes, precedence, remote import, **Agent vs IDE** table); `docs/CURSOR_LIMITS.md` extended (Tab/inline vs Agent, precedence); light wiring in `AGENTS.md`, `mstack-core-workflow.mdc`, `mstack-token-discipline.mdc`, README, ONBOARDING, CONTRIBUTING, `docs/AGENT_MEMORY.md`, `docs/workflow.md`.
- **Wave 7 (efficiency):** `docs/TOKEN_LEVERS.md`, `templates/AGENT_RECAP_TEMPLATE.md`, `mstack-surgical-investigation.mdc` (standard + full), `/mstack-lean-handoff` skill; tighter debug hypothesis/instrumentation guidance in `mstack-debug.mdc`; extended `PLAYBOOK_FIRST_MESSAGES.md`.
- Community wave: CONTRIBUTING, CODE_OF_CONDUCT, issue/PR templates, SHOWCASE, FAQ, CHANGELOG.

## [0.6.0] - 2026-04-20

### Added

- **Wave 5:** `mstack-privacy-data-handling`, `mstack-feature-flags`, `mstack-open-source-license` and templates (`PRIVACY_IMPACT_LITE`, `FEATURE_FLAG_CHANGE_CHECKLIST`, `LICENSE_HYGIENE_CHECKLIST`).
- **Wave 4:** `mstack-secrets-env`, `mstack-i18n-localization`, `RELEASE_OWNER_CHECKLIST`, `/mstack-pack-picker` skill.
- **High-leverage wave:** `mstack-doctor`, `verify-packs-internal`, `mstack-adoption-audit`, solo pack, `ADOPTION_AUDIT`, `PLAYBOOK_FIRST_MESSAGES`, example consumer CI workflow.
- **Power-user wave:** `SESSION_BRIEF` pattern, `verify-mstack-sync`, `mstack-mechanical-pass`.
- **Reduce friction wave:** pack manifests (`scripts/packs/*.txt`), `MSTACK_PACK` / `SYNC_TEMPLATES` / `INIT_PROJECT_MEMORY` on `sync-mstack.sh`, Lite pack, `CURSOR_LIMITS`, product review lite, `docs/PROJECT_MEMORY` flow.
- **Earlier:** core workflow, token discipline, permissions, specialists, templates, flight-deck skill, Ideas API, onboarding/playbook/troubleshooting suite.

### Changed

- Documentation expanded (`EFFECTIVENESS`, `SPECIALIST_MAP`, benchmark docs removed per branch history where applicable).

<!-- Release links: add compare URLs when you tag a release on GitHub. -->
