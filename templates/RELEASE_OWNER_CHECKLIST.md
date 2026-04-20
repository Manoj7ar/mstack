# Release owner checklist — [version]

_Use with `mstack-release-versioning.mdc` and ship docs._

## Pre-release

- [ ] **Version** bump aligned with policy (semver / calver)
- [ ] **CHANGELOG** / release notes updated (`mstack-docs-ship` if applicable)
- [ ] **Migrations** or data backfills documented; rollback story noted
- [ ] **Feature flags** / config defaults verified for prod
- [ ] **Secrets / env:** no new required vars undocumented (see `SECRETS_AND_ENV_CHECKLIST.md`)

## Verification

- [ ] Tests / lint / typecheck (or explicit skip with reason)
- [ ] Staging or canary smoke if your org uses it

## Ship

- [ ] Tag created; CI release job green
- [ ] **Comms:** stakeholders or users notified if behavior-visible

## Post-release

- [ ] Monitor errors / metrics per runbook
- [ ] Rollback path confirmed if incident
