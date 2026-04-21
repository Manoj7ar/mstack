# mstack starter kit (first win in one page)

**Fastest path:** run sync → doctor → one Agent message. You do **not** need the sample Ideas API in `src/` — see [FAQ.md](FAQ.md).

## Prerequisites

- [Cursor](https://cursor.com) with **Agent** chat.
- A path to this repo: **clone**, **submodule** at `vendor/mstack`, or a **copy** of the folder.

Pick a **pack** first (one minute): [PACKS.md](PACKS.md) — `minimal`, `lite`, `solo`, `standard`, or `full`.

## Step 1 — Sync into your app repo

From **your app’s root** (adjust `MSTACK_ROOT` if mstack lives elsewhere):

```bash
chmod +x vendor/mstack/scripts/sync-mstack.sh

# Most apps (recommended)
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard INIT_PROJECT_MEMORY=1 vendor/mstack/scripts/sync-mstack.sh

# Tiny repo or scripts-only
MSTACK_ROOT=vendor/mstack MSTACK_PACK=minimal vendor/mstack/scripts/sync-mstack.sh

# Everything in this repo
MSTACK_ROOT=vendor/mstack MSTACK_PACK=full INIT_PROJECT_MEMORY=1 vendor/mstack/scripts/sync-mstack.sh
```

- **`SYNC_TEMPLATES=0`** — rules and skills only, skip `templates/*.md`.
- **`SYNC_AGENTS_SNIPPET=1`** — writes `AGENTS.md.mstack-snippet` for manual merge into your existing `AGENTS.md`.

**In this mstack checkout** (to preview a pack into `/tmp`):  
`MSTACK_ROOT=. MSTACK_PACK=standard bash scripts/sync-mstack.sh /tmp/mstack-preview`

## Step 2 — Verify

```bash
bash vendor/mstack/scripts/mstack-doctor.sh .
# Strict: rules match pack exactly
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard MSTACK_VERIFY_STRICT=1 bash vendor/mstack/scripts/mstack-doctor.sh .
```

From **mstack repo root** only: `npm run mstack:doctor`.

## Step 3 — First messages in Agent

Copy-paste library: [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md).

- **Unsure which pack?** Type **`/mstack-pack-picker`** in chat.
- **Guided commands:** Type **`/mstack-first-sync`** (prints sync + merge hints; does not edit files unless you ask).
- **Overview (Canvas):** **`/mstack-flight-deck`** (Cursor 3.1+).

**All `/mstack-*` skills:** [SKILLS.md](SKILLS.md). **Long thread / huge `@`:** [CONTEXT_BUDGET.md](CONTEXT_BUDGET.md), **`/mstack-context-budget`**. **No submodule?** [RULES_SOURCE.md](RULES_SOURCE.md). **Team rollout:** [TEAM_ROLLOUT.md](TEAM_ROLLOUT.md).

## Optional — drift check

```bash
MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/verify-mstack-sync.sh --strict standard .
```

Consumer CI example: `.github/workflows/mstack-pack-verify.yml.example`. Details: [POWER_USER.md](POWER_USER.md).

## Day-one checklist

Track setup with [templates/MSTACK_DAY_ONE_CHECKLIST.md](../templates/MSTACK_DAY_ONE_CHECKLIST.md).

## Already installed?

Refresh after **`git submodule update`** or pulling mstack: [VENDOR_UPGRADE.md](VENDOR_UPGRADE.md). In Agent: **`/mstack-upgrade-vendor`**.

## See also

- [DOCS_MAP.md](DOCS_MAP.md) — reading order by role if this repo feels huge
- [WHY_MSTACK.md](WHY_MSTACK.md) — why try mstack (honest)
- [ONBOARDING.md](ONBOARDING.md) — 5-minute narrative
- [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md) — full audit list
- [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md) — Agent vs IDE
