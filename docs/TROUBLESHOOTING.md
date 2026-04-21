# mstack troubleshooting

## GitHub Actions: workflow fails in 1–4s with no step logs

If the job shows **no steps ran** (or finishes almost instantly), GitHub **never assigned a runner**—this is **not** a failing `npm` command in your YAML. Check, in order:

1. **Repo:** **Settings → Actions → General** — Actions must be **allowed** (not “Disable actions”).
2. **Fork PRs:** **Settings → Actions → General → Fork pull request workflows** — if PRs are from forks, choose **Require approval for all outside collaborators** or allow workflows as needed; otherwise fork PRs never run.
3. **Organization:** Org **Settings → Actions → Policies** — the org may **restrict** which workflows run or require approval for public repos.
4. **Billing / limits:** **Settings → Billing** (user or org) — **Actions minutes**, **spend limits**, or account flags can block hosted runners. The UI sometimes says **“billing issue”** even when the fix is **raising the spend limit** or **enabling Actions** on a free/org plan.
5. **Sanity check:** Open **Actions → “mstack CI smoke” → Run workflow** (manual). If **smoke** also fails with empty steps, the problem is **platform/settings**, not the main `mstack-ci.yml` script.

**Run the same checks locally** (mirrors CI):

```bash
npm run mstack:ci
```

Or: `bash scripts/mstack-ci-local.sh` from the repo root.

## Is mstack helping or just adding noise?

- Read [EFFECTIVENESS.md](EFFECTIVENESS.md) — usefulness bands and known weaknesses.
- Shrink packs (Minimal / Lite / Solo) or trim overlap per [SPECIALIST_MAP.md](SPECIALIST_MAP.md).

## Rules do not seem to apply

1. **Location:** Project rules belong in **`.cursor/rules/`** with extension **`.mdc`** or **`.md`** ([Cursor Rules](https://cursor.com/docs/rules)).
2. **Rule type:** In Cursor **Settings → Rules**, check whether a rule is **Always apply**, **Apply intelligently** (needs a good `description`), or **Apply to specific files** (needs matching `globs`).
3. **Globs:** If a specialist never fires, paths in your repo may not match—edit the `globs:` list in that `.mdc`.
4. **Manual apply:** **@mention** the rule in chat (e.g. `@mstack-debug`, `@mstack-product-review`).

## Agent ignores AGENTS.md

- **`AGENTS.md`** should live at the **project root** (or nested per Cursor’s nested AGENTS support). Merge snippets from mstack into **one** coherent `AGENTS.md`—do not maintain two conflicting instruction files.
- Confirm you are using **Agent** chat, not only Tab completion—rules apply to **Agent** per Cursor docs.

## Too much context / slow or expensive

- Follow **`mstack-token-discipline.mdc`**: search narrow, read slices, one summary before big edits.
- **`@mstack-model-strategy`** for tier hints (advisory only).
- Start a **fresh chat** with **`@mstack-session-handoff`** and a minimal briefing.

## Wrong specialist fires

- Remove overlapping rules from your vendored set (see [PACKS.md](PACKS.md) **Custom**).
- Narrow `globs` on noisy rules; prefer **@mention** for rare postures.

## Too many rules / feels heavy

- Switch to **[Lite](PACKS.md#lite-5-files)** or **[Minimal](PACKS.md#minimal-3-files)** in [PACKS.md](PACKS.md).
- Re-sync with a smaller pack: `MSTACK_ROOT=vendor/mstack MSTACK_PACK=lite vendor/mstack/scripts/sync-mstack.sh` (or `minimal`).
- Turn off template copy if you only need rules: `SYNC_TEMPLATES=0`.

## Design research without permission

- **`mstack-design-research.mdc`** requires **explicit user permission** before web fetches. If the agent browsed without ask, tighten your user message or add a project rule line reinforcing the gate.

## Merge / sync after submodule

- Run **`MSTACK_ROOT=vendor/mstack ./scripts/sync-mstack.sh`** from your app root; re-merge **`AGENTS.md`** if needed.
- Skills copy when **`vendor/mstack/.cursor/skills`** exists (see `sync-mstack.sh`).

## Still stuck

- Read [ONBOARDING.md](ONBOARDING.md) and [workflow.md](workflow.md).
- Check [DECISIONS.md](DECISIONS.md) for repo-specific choices.
