---
name: mstack-ship-check
description: Pre-merge / pre-PR numbered checklist — lint/tests, secrets, security, QA, docs. Use when the user types /mstack-ship-check or asks what to verify before opening a PR or merging.
disable-model-invocation: true
---

# mstack ship check (skill)

Emit a **numbered checklist** the user can paste into a **PR description** or run mentally before merge. **Do not** write files unless the user asks.

## When to use

- User invoked **`/mstack-ship-check`** or asked **before merge**, **PR checklist**, **what to verify before ship**.

## Steps

1. Ask once if needed: **canonical verify commands** for this repo (e.g. `npm test`, `npm run lint`). If unknown, print placeholders: `[your test command]`, `[your lint command]`.

2. Print the checklist below, substituting commands and ticking optional lines based on what the user said they changed (auth, env, UI, API, deps).

3. Link templates: [`templates/PR_CHECKLIST_TEMPLATE.md`](../../templates/PR_CHECKLIST_TEMPLATE.md), [`templates/SECRETS_AND_ENV_CHECKLIST.md`](../../templates/SECRETS_AND_ENV_CHECKLIST.md), [`templates/UI_ACCEPTANCE_CHECKLIST.md`](../../templates/UI_ACCEPTANCE_CHECKLIST.md), [`templates/SECURITY_REVIEW_LITE.md`](../../templates/SECURITY_REVIEW_LITE.md).

## Checklist template (output this)

```text
## Ship check (mstack)

1. [ ] **Lint / typecheck:** [command or "skipped — reason"]
2. [ ] **Tests:** [command or "skipped — reason"]
3. [ ] **Secrets:** no keys/tokens in diff; env/CI reviewed — see @mstack-secrets-env + templates/SECRETS_AND_ENV_CHECKLIST.md
4. [ ] **Security** (if auth, parsing, uploads, webhooks, or trust boundaries touched): @mstack-security-review — optional lite: templates/SECURITY_REVIEW_LITE.md
5. [ ] **QA** (if behavior changed): @mstack-testing-qa — proportionate tests; templates/TEST_PLAN_TEMPLATE.md if helpful
6. [ ] **UI** (if user-visible): templates/UI_ACCEPTANCE_CHECKLIST.md; @mstack-accessibility if components changed
7. [ ] **Docs / changelog** (if user-facing or API): README, CHANGELOG, or OpenAPI per repo norms
8. [ ] **Destructive / prod:** user confirmed per mstack-permissions if applicable
```

## Do not

- Claim green CI or pass tests without the user running commands.
- Replace org security review, scanners, or pen tests — mstack is **engineering guardrails** only.
