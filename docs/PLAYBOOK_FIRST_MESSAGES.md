# First messages (copy-paste)

Low-latency openers for Agent chat. Adjust paths to your repo.

## New chat after handoff

```text
Read SESSION_BRIEF.md and docs/PROJECT_MEMORY.md, then continue: [one-line goal].
```

## Plan Mode bootstrap

```text
mstack phases: Think → Plan only. Scope: [X]. Use Plan Mode; output should fit templates/PLAN_TEMPLATE.md. Follow mstack-token-discipline.
```

## Debug (consent-aware)

```text
Runtime bug: [symptom]. Use mstack-debug / Debug Mode. Do not add logging or repro-for-logs until I confirm.
```

## Mechanical pass

```text
@mstack-mechanical-pass — [task]. 3–5 line plan in chat, then implement. Verify with: [command].
```

## Adoption audit

```text
@mstack-adoption-audit — walk docs/ADOPTION_AUDIT.md against this workspace and report gaps.
```

## Doctor (from mstack checkout or vendored copy)

```text
Run: bash vendor/mstack/scripts/mstack-doctor.sh . (or from mstack repo root: npm run mstack:doctor). Summarize.
```

## Pack choice

```text
/mstack-pack-picker — solo dev, [UI+API or scripts-only], [localized app yes/no]. Recommend MSTACK_PACK and sync command.
```

## See also

- [PLAYBOOK.md](PLAYBOOK.md) — sprint shape
- [POWER_USER.md](POWER_USER.md) — CI verify, packs
