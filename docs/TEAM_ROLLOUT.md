# Rolling out mstack to a team

For **tech leads and champions** introducing mstack into an existing codebase. Share this page instead of re-walking the whole repo.

## What you are selling (honestly)

mstack is **shared guardrails and phase habits** for Cursor Agent—not automatic model upgrades or guaranteed token savings. See [EFFECTIVENESS.md](EFFECTIVENESS.md) and [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

Teams usually get value from: **consistent** Think → Plan → Build → Review → Test → Ship, **permission gates** on destructive work, and **fewer** “agent went off the rails” surprises.

## Pilot (keep it small)

1. Pick **one** pack for the pilot—usually **standard** for app teams, **lite** or **solo** for small squads ([PACKS.md](PACKS.md)).
2. Name an **`AGENTS.md` merge owner** so bootstrap stays one coherent file, not two conflicting copies.
3. Run **[STARTER_KIT.md](STARTER_KIT.md)** once in a test branch; **`bash vendor/mstack/scripts/mstack-doctor.sh .`** (or **`npm run mstack:doctor`** from an mstack checkout) should pass before you ask everyone to adopt.

## Agreements that reduce friction

- **Session handoff:** Decide if **`SESSION_BRIEF.md`** is tracked or gitignored ([PLAYBOOK.md](PLAYBOOK.md)).
- **Quarterly check:** [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md) or **`@mstack-adoption-audit`** (full pack).
- **Optional drift checks:** Consumer workflow from [`.github/workflows/mstack-pack-verify.yml.example`](../.github/workflows/mstack-pack-verify.yml.example) ([POWER_USER.md](POWER_USER.md)).

## First week (copy to Slack / wiki)

- **Day 0:** [STARTER_KIT.md](STARTER_KIT.md) + **`/mstack-first-sync`** or **`/mstack-pack-picker`**
- **Ongoing:** [RECIPES.md](RECIPES.md) when someone asks “which rule do I @?”
- **Chat openers:** [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md)
- **Skills index:** [SKILLS.md](SKILLS.md)

## Rules without a submodule?

See [RULES_SOURCE.md](RULES_SOURCE.md) (vendoring vs Cursor remote import).

## See also

- [ONBOARDING.md](ONBOARDING.md) — 5-minute narrative
- [MONOREPO.md](MONOREPO.md) — one vendor root, nested `AGENTS.md`
- [SHOWCASE.md](SHOWCASE.md) — add your org’s public repo when ready
