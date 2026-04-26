# Adoption scorecard

Use this when you want a fast, local answer to:

> “Is mstack actually installed well in this repo?”

The scorecard is **not** a productivity benchmark and does **not** estimate token savings. It checks whether the install has the pieces that make mstack useful: core rules, pack alignment, bootstrap files, skills, templates, and handoff/memory files.

## Run it

From a consumer repo root:

```bash
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard \
  bash vendor/mstack/scripts/mstack-scorecard.sh .
```

Strict pack drift check:

```bash
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard MSTACK_VERIFY_STRICT=1 \
  bash vendor/mstack/scripts/mstack-scorecard.sh .
```

Machine-readable output:

```bash
MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard MSTACK_SCORE_JSON=1 \
  bash vendor/mstack/scripts/mstack-scorecard.sh .
```

In Cursor, type **`/mstack-scorecard`** for copy-paste commands.

## Try it without touching your repo

From the **mstack** checkout:

```bash
MSTACK_PACK=standard bash scripts/mstack-demo-consumer.sh
```

This creates a temporary consumer repo, syncs a pack, runs doctor + scorecard, and prints a first Agent message. It prints the temp path and cleanup command; it does not modify your app.

In Cursor, type **`/mstack-demo-consumer`**.

## What is scored

| Area | Why it matters |
| ---- | -------------- |
| Required rules | `mstack-core-workflow`, `mstack-token-discipline`, `mstack-permissions` are the minimum useful behavior. |
| Pack verification | Confirms installed rules match the pack you think you synced. |
| `AGENTS.md` | Root bootstrap makes the rules easier for Agent to follow consistently. |
| `.cursor/skills/` | Enables `/mstack-*` commands for repeatable workflows. |
| `templates/` | Makes plans, tests, PR checks, ADRs, and handoffs concrete. |
| `docs/PROJECT_MEMORY.md` | Gives Agent durable product/design context when you opt in. |
| Handoff files | `SESSION_BRIEF.md` or `docs/AGENT_RECAP.md` reduces re-spelunking in long work. |

## Bands

| Score | Band | Meaning |
| ----- | ---- | ------- |
| 85–100 | excellent | Ready for team use; only small optional gaps. |
| 70–84 | good | Useful install, but one or two pieces are missing. |
| 40–69 | partial | Some mstack exists, but behavior will be inconsistent. |
| 0–39 | not installed | Start with [STARTER_KIT.md](STARTER_KIT.md) or **`/mstack-first-sync`**. |

## Scorecard vs doctor vs audit

| Tool | Purpose |
| ---- | ------- |
| `mstack-doctor.sh` | Fast pass/fail: required rules and optional pack verify. |
| `mstack-scorecard.sh` | Weighted install health with warnings and next steps. |
| [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md) | Human/team checklist for setup, ownership, and recurring drift review. |

## See also

- [STARTER_KIT.md](STARTER_KIT.md) — first install
- [POWER_USER.md](POWER_USER.md) — drift checks and strict verify
- [PACKS.md](PACKS.md) — choose a pack
