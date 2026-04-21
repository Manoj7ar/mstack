# Breaking change checklist

_Use before shipping **API**, **schema**, **webhook**, or **dependency** changes that **break** existing consumers or runtime behavior. Pair with **`@mstack-breaking-change`** (full pack). Not legal advice—align with your org._

**Change / ticket:**  
**Owner:**  
**Target ship:**

## Scope

- **What breaks:** (behavior, field, endpoint, min version, etc.)
- **Who is affected:** (internal only / external API / mobile / partners)

## Compatibility

- [ ] **Additive path** considered first (new field optional, new endpoint, feature flag)
- [ ] **Deprecation window** documented if removal is required
- [ ] **Migration** or **dual-write** period defined (if data or events)

## Consumers

- [ ] **Changelog** / release note / comms plan (link or N/A)
- [ ] **Versioning** aligned with repo norms (path, header, package semver) — see `@mstack-api-contracts`, `@mstack-release-versioning`

## Verify

- **Commands:** (tests, contract tests, smoke)
- **Rollback:** (revert, flag off, previous schema — one line)

## Dependencies

- [ ] **`@mstack-dependencies`** if lockfile / major bump risk
- [ ] **`@mstack-security-review`** if auth, parsing, or supply chain surface changes

## Post-ship

- [ ] **`templates/OPENAPI_DELTA_TEMPLATE.md`** or OpenAPI updated if HTTP surface changed
- [ ] Runbook or **`docs/PROJECT_MEMORY.md`** updated if standing policy changed
