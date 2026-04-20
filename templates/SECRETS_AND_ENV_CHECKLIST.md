# Secrets and environment checklist

_Use before commits/PRs that touch env, CI, or credentials._

## Before commit

- [ ] No real secrets in diff (tokens, passwords, private keys, live DB URLs with creds)
- [ ] `.env` / local overrides are **gitignored**; only `.env.example` (names + dummy values) is tracked if needed
- [ ] No secrets in workflow YAML literals—use platform **secrets** / **vars**

## Before merge / release

- [ ] New env vars documented (name, purpose, required vs optional)—not values
- [ ] Rotation plan noted if keys are long-lived

## After suspected leak

- [ ] Revoke / rotate affected credentials
- [ ] Audit git history and logs per org policy (not automated by mstack)
