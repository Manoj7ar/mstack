# mstack FAQ

## What should I do in the first 10 minutes?

1. Open **[STARTER_KIT.md](STARTER_KIT.md)** — copy the **sync** and **doctor** commands for your repo layout (`vendor/mstack` or adjust `MSTACK_ROOT`).
2. In Cursor Agent, type **`/mstack-first-sync`** for tailored copy-paste commands (or **`/mstack-pack-picker`** if you have not chosen a pack).
3. Send one message from **[PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md)** (e.g. mechanical pass or plan bootstrap).

## Does mstack switch my Cursor model?

**No.** Rules cannot change the model, Plan Mode, or Debug Mode. See [CURSOR_LIMITS.md](CURSOR_LIMITS.md).

## Will mstack save tokens?

**Sometimes.** Token discipline nudges narrower reads; phase gates can add confirmation turns. See [EFFECTIVENESS.md](EFFECTIVENESS.md).

## How do I use fewer rules?

Pick a smaller pack: [PACKS.md](PACKS.md) (Minimal, Lite, Solo). Trim overlap with [SPECIALIST_MAP.md](SPECIALIST_MAP.md). Use `@mstack-mechanical-pass` for chores.

## How do I verify my install matches a pack?

`MSTACK_ROOT=vendor/mstack vendor/mstack/scripts/verify-mstack-sync.sh --strict standard .` (adjust paths and pack name). See [POWER_USER.md](POWER_USER.md).

## Does mstack replace security or legal review?

**No.** Rules are engineering guardrails. Security, privacy, and license rules include **not legal advice** disclaimers where relevant.

## mstack vs GStack / Claude Code?

mstack is **inspired by** workflow ideas popularized by projects like GStack; it is **Cursor-native** (`.cursor/rules`, `AGENTS.md`) and **not a fork**. See [GSTACK_INSPIRATION.md](GSTACK_INSPIRATION.md).

## The sample API — do I need it?

**No.** Consumers can delete `src/`, `tests/`, and related docs if they only want the rules pack.

## Where do I contribute?

[CONTRIBUTING.md](../CONTRIBUTING.md) and [CHANGELOG.md](../CHANGELOG.md).
