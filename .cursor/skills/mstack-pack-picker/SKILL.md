---
name: mstack-pack-picker
description: Recommend an mstack rule pack (minimal, lite, solo, standard, full) from a few questions. Use when the user types /mstack-pack-picker or asks which mstack pack to use.
disable-model-invocation: true
---

# mstack pack picker

Help the user choose **`MSTACK_PACK`** for [`scripts/sync-mstack.sh`](../../scripts/sync-mstack.sh) without reading the entire repo.

## When to use

- User invoked **`/mstack-pack-picker`** or asked **which pack**, **minimal vs standard**, **solo vs lite**, etc.

## Data gathering (bounded)

1. Read **section headings** only from [`docs/PACKS.md`](../../docs/PACKS.md) (Minimal, Lite, Solo, Standard, Full).
2. Skim the **Which pack?** diagram intro from [`docs/ONBOARDING.md`](../../docs/ONBOARDING.md) if needed—do not load the whole file.

## Question flow (3–6 questions)

Ask only what is still unknown, then recommend **one** primary pack and optionally one alternate.

Suggested questions (adapt wording):

1. **Scope:** tiny scripts/infra only, small app, full product (UI + API), or large/compliance-heavy monolith?
2. **Solo vs team:** mostly solo (session handoff + memory matters) or team with CI discipline?
3. **Surface:** shipping localized UI (if yes, mention **full** for `mstack-i18n-localization`)?
4. **Strictness:** need **CI verify** with `--strict` pack match (any serious team → **standard** or **full**)?

## Mapping (default hints)

| Situation | Suggest |
| --------- | ------- |
| Fastest safety only | **minimal** |
| Solo, continuity + model hints | **lite** |
| Solo + project memory + mechanical turbo, no FE/BE specialists | **solo** |
| Typical app (UI + API + tests + review) | **standard** |
| Data modeling, observability, product review rule, i18n, adoption audit | **full** |

## Output format

- **Recommended pack:** `MSTACK_PACK=...` with **one sentence why**.
- **Commands:** e.g. `MSTACK_ROOT=vendor/mstack MSTACK_PACK=<pack> INIT_PROJECT_MEMORY=1 vendor/mstack/scripts/sync-mstack.sh` and optional `verify-mstack-sync.sh --strict <pack>`.
- **Links:** [`docs/PACKS.md`](../../docs/PACKS.md), [`docs/POWER_USER.md`](../../docs/POWER_USER.md) (doctor, CI).

## Do not

- Guarantee a subjective “best” pack without user confirmation on constraints.
- Invent pack names—only **minimal**, **lite**, **solo**, **standard**, **full**, or **all**.
