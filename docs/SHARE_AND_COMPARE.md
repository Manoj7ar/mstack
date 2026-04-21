# Share mstack — pitches and comparisons

Use this when you want to **show** the project without overselling. **Skills:** **`/mstack-pitch-short`** for pasteable blurbs · **First messages:** [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md).

## One-line hook

**mstack** = opinionated **Cursor Agent** rules + templates (phases, permissions, specialists) you **vendor** into your repo — not a hosted product.

## README snippet (copy)

```markdown
## Cursor / mstack

This repo uses [mstack](https://github.com/Manoj7ar/mstack) for **Cursor Agent** workflow. Quick start: [Starter kit](https://github.com/Manoj7ar/mstack/blob/main/docs/STARTER_KIT.md). In Cursor: **`/mstack-first-sync`** or **`/mstack-pack-picker`**. [Badge snippets](https://github.com/Manoj7ar/mstack/blob/main/docs/BADGE.md) · [Showcase](SHOWCASE.md) (add your row upstream).
```

## Comparison (when someone asks “why not just …?”)

| Approach | What you get | Tradeoff |
| -------- | ------------ | -------- |
| **mstack** | Pack manifests, verify scripts, broad **docs + templates**, specialists | Adoption tax: sync, merge `AGENTS.md`, pick a pack |
| **A few hand-written `.mdc` rules** | Minimal, you own every line | No shared verify story; reinvent templates |
| **Cursor remote rule import** | No submodule | Often **rules only** — skills/templates still manual ([RULES_SOURCE.md](RULES_SOURCE.md)) |
| **User rules only** | Fast for solo | Not **project-default** for the whole team |

## Where to point newcomers

1. [WHY_MSTACK.md](WHY_MSTACK.md) — honest pitch  
2. [STARTER_KIT.md](STARTER_KIT.md) — fastest install  
3. [DOCS_MAP.md](DOCS_MAP.md) — if overwhelmed by `docs/`  

## List your project

Add a row to [SHOWCASE.md](SHOWCASE.md) via PR when you adopt — it helps the next team.

## See also

- [TEAM_ROLLOUT.md](TEAM_ROLLOUT.md) — champion playbook  
- [EFFECTIVENESS.md](EFFECTIVENESS.md) — when it helps vs noise
