# How useful is mstack? (honest guide)

This page states **where mstack tends to help**, **where it still struggles**, and **how to raise your odds**—without claiming magic.

## When usefulness is usually higher

mstack behaves like **shared team glue** plus **guardrails**, not an automatic IQ boost.

| Situation | Typical band | Why |
| --------- | ------------ | --- |
| **Team or multi-chat work** — handoffs, CI verify, same phases | ~65–80 / 100 | `SESSION_BRIEF`, packs, `verify-mstack-sync`, `AGENTS.md` reduce drift. |
| **Safety-sensitive workflows** — destructive git, secrets, invasive debug | Adds a lot | `mstack-permissions`, `mstack-secrets-env`, `mstack-debug` encode gates. |
| **You will vendor + run doctor/verify + pick a pack** | Baseline lifted | Fewer silent mis-installs than ad-hoc rule dumps. |

Bands are **subjective**; use them to **set expectations**, not as benchmarks.

## When usefulness is often lower

| Situation | Typical band | Why |
| --------- | ------------ | --- |
| **Solo expert** with a strong personal system | ~45–60 / 100 | Much of mstack **documents** habits you already follow. |
| **Rules copied but never merged into behavior** | ~10–25 / 100 | If nobody uses packs, session brief, or permissions posture, value stays on disk. |
| **Expecting automatic model switching or “smarter LLM”** | Near 0 extra | Rules cannot change Cursor’s model; see [CURSOR_LIMITS.md](CURSOR_LIMITS.md). |

## Known weaknesses (and what we already ship to offset them)

| Weakness | Mitigation in-repo |
| -------- | ------------------- |
| **Adoption tax** (sync, `AGENTS.md`, memory) | [ONBOARDING.md](ONBOARDING.md) fast path, [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md), `mstack-doctor`, `/mstack-pack-picker` |
| **Overlap / heavy feel** | [SPECIALIST_MAP.md](SPECIALIST_MAP.md), Lite/Solo/Minimal packs, [PACKS.md](PACKS.md) Custom |
| **Ceremony can add turns/tokens** | `@mstack-mechanical-pass`, compress phases in [mstack-core-workflow.mdc](../.cursor/rules/mstack-core-workflow.mdc) |
| **No proof of token savings without measurement** | [TOKEN_LEVERS.md](TOKEN_LEVERS.md) + Cursor **Usage** UI; same-task paired runs (with vs without recap / smaller context) if you want a subjective comparison |
| **Product judgment** still on humans | `mstack-product-review`, `PRODUCT_REVIEW_LITE` |

## Strongest parts of this stack (measurable + design)

- **Pack manifests** + **`verify-mstack-sync.sh --strict`** — drift detection for vendored rules.
- **`mstack-doctor`** — quick required-rule check.
- **Clear Cursor limits** — fewer wrong expectations.
- **Breadth of specialists** — opt-in via packs; Full is optional.

## Make your install “actually useful” (checklist)

1. Pick **one** pack; do not start at Full unless you need it ([PACKS.md](PACKS.md)).
2. Run **`mstack-doctor`** and optionally **strict verify** in CI ([POWER_USER.md](POWER_USER.md)).
3. Adopt **`SESSION_BRIEF.md`** or accept more paste-heavy handoffs ([PLAYBOOK.md](PLAYBOOK.md)).
4. Merge **`AGENTS.md`** or accept that bootstrap is weaker.
5. For chores, **`@mstack-mechanical-pass`** in the first message.

## See also

- [CURSOR_LIMITS.md](CURSOR_LIMITS.md)
- [GSTACK_INSPIRATION.md](GSTACK_INSPIRATION.md) — what this is / isn’t
