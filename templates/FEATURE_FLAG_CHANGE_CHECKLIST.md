# Feature flag change — [flag name]

## Definition

- [ ] **Default** (on/off) documented for dev/staging/prod
- [ ] **Owner** or team responsible for lifecycle

## Rollout

- [ ] Gradual rollout or instant — matches risk
- [ ] **Telemetry** or monitoring for the gated path (if applicable)

## Rollback

- [ ] **Kill switch** verified (disable flag restores prior behavior)
- [ ] No irreversible migrations solely behind the flag without a down path

## Hygiene

- [ ] No secrets in flag payloads or SDK init in repo
- [ ] **Docs** / release notes if users or support need to know
