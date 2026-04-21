# First messages (copy-paste)

Low-latency openers for Agent chat. Adjust paths to your repo. **Task → rule index:** [RECIPES.md](RECIPES.md).

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

## First sync (new consumer repo)

```text
/mstack-first-sync — mstack is at [path, e.g. vendor/mstack]. Recommend MSTACK_PACK and print exact sync + doctor commands. Do not write files unless I ask.
```

## Upgrade vendored mstack

```text
/mstack-upgrade-vendor — MSTACK_ROOT=[e.g. vendor/mstack], MSTACK_PACK=[same as install]. Print submodule/update, re-sync, doctor, strict verify. I will run the commands.
```

## Hotfix / rollback

```text
Prod hotfix: [symptom]. Use templates/HOTFIX_OR_ROLLBACK_CHECKLIST.md in chat as a checklist; @mstack-permissions for destructive/prod steps; @mstack-debug only if runtime evidence needed—ask before invasive logging.
```

## Surgical investigation (standard+ pack)

```text
@mstack-surgical-investigation — Find where [X] is implemented / how [flow] works. Hypothesis + max 8 files + stop condition; then state-of-world ≤15 lines. Follow mstack-token-discipline.
```

## Recap-only continuation (same or new chat)

```text
Read docs/AGENT_RECAP.md (and SESSION_BRIEF.md if present) only—do not re-scan the repo—then: [one-line goal].
```

## Budgeted question (paths only)

```text
Answer in ≤7 bullets, cite file paths only (no code blocks unless one line). Question: […]
```

## Lean handoff (write recap)

```text
/mstack-lean-handoff — Summarize this thread into docs/AGENT_RECAP.md using templates/AGENT_RECAP_TEMPLATE.md; say if SESSION_BRIEF.md needs an update for a full chat switch.
```

## See also

- [RECIPES.md](RECIPES.md) — which `@mention` for which task
- [PLAYBOOK.md](PLAYBOOK.md) — sprint shape
- [POWER_USER.md](POWER_USER.md) — CI verify, packs
- [TOKEN_LEVERS.md](TOKEN_LEVERS.md) — habits that reduce wasted context
