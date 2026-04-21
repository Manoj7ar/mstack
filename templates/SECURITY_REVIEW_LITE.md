# Security review (lite)

_One-page **human** pass before merging risky changes. **Not** a penetration test, scanner substitute, or legal sign-off. For a fuller boundary review, use **`@mstack-security-review`**._

**Change / PR:**  
**Reviewer:**  
**Date:**

## Scope

- **What changed:** (routes, auth, parsing, deps, infra)
- **Trust boundaries:** (public internet, authenticated users, admin, internal only)

## Checklist

- [ ] **Authn** — sessions/tokens validated; secure cookies / headers per stack norms
- [ ] **Authz** — every sensitive action checks permission; no IDOR by guessing IDs
- [ ] **Input** — validation and size limits on untrusted input; safe encoding for output contexts
- [ ] **Secrets** — none in code or logs; env/CI reviewed (`@mstack-secrets-env`, `SECRETS_AND_ENV_CHECKLIST.md`)
- [ ] **Logging** — no passwords, full tokens, or unnecessary PII in logs
- [ ] **Dependencies** — notable semver bumps or new packages called out (`@mstack-dependencies` if large)

## Residual risk

- **What we did not review:** (e.g. threat model, full STRIDE — say so)
- **Follow-up:** open issue or full **`@mstack-security-review`** if warranted
