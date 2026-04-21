# ADR snippet — optional file-backed store

_Use full [templates/ADR_TEMPLATE.md](../../templates/ADR_TEMPLATE.md) for real ADRs._

## Status

Accepted (demo scope)

## Context

In-memory store resets on restart; contributors asked for **slightly** more realistic persistence without pulling in a database.

## Decision

Add **`IDEAS_STORE_PATH`**: when set, use `FileIdeasStore` — JSON snapshot after each mutation. **Not** for production concurrency.

## Consequences

- Simpler demos; file corruption or concurrent processes can clobber data
- Tests cover restart persistence via injected `FileIdeasStore` + two `createAppServer` instances
