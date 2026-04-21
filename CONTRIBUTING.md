# Contributing to mstack

Thanks for helping improve mstack. This repo is a **Cursor rules pack** plus docs, scripts, and an optional sample API—not a hosted product.

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## What belongs here

- **Rules** (`.cursor/rules/mstack-*.mdc`): narrow, opt-in specialists with clear `description` and sensible `globs` (or `alwaysApply` only when justified). Cursor suggests keeping rules **under ~500 lines**, focused and scannable—see [Cursor Rules](https://cursor.com/docs/context/rules) best practices. Prefer **skills** (`.cursor/skills/`) for long multi-step workflows vs stuffing everything into one rule—[Skills](https://cursor.com/docs/agent/chat/commands) vs Rules in Cursor docs.
- **Templates** (`templates/*.md`): short, copy-paste friendly; pair with a rule when they are part of workflow.
- **Packs** (`scripts/packs/*.txt`): every shipped `mstack-*.mdc` must appear in **`full.txt`**; add to **`standard.txt`** only if most product teams need it daily; **`minimal` / `lite` / `solo`** stay small on purpose.
- **Docs** (`docs/`): onboarding, honesty about limits—see [docs/CURSOR_LIMITS.md](docs/CURSOR_LIMITS.md).

## What does **not** belong

- Claims that project rules **switch Cursor models** or **guarantee** token savings.
- Legal, security, or compliance **advice** framed as definitive (keep “not legal advice” / consult experts where we already do).
- Huge always-on rules that duplicate `mstack-core-workflow` or `mstack-token-discipline`.

## Before you open a PR

1. **Small diffs**; match existing Markdown and rule style.
2. Run locally (from repo root). **Full CI parity** (same as GitHub Actions):

   ```bash
   npm run mstack:ci
   ```

   Or step-by-step: `npm install`, `npm run mstack:verify-packs`, `npm run mstack:doctor`, strict doctor + sync smoke (see `scripts/mstack-ci-local.sh`), `npm test`, `npm run lint`.

   If **GitHub CI** fails instantly with a **billing / account locked** message, see [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

3. If you changed packs, smoke sync:

   ```bash
   for p in minimal standard full; do
     d=$(mktemp -d)
     MSTACK_ROOT=. MSTACK_PACK=$p bash scripts/sync-mstack.sh "$d"
     MSTACK_ROOT=. bash scripts/verify-mstack-sync.sh --strict "$p" "$d"
   done
   ```

4. **README:** add a one-line row to the rules or templates table if you add a rule or template.
5. **Changelog:** add an entry under **Unreleased** in [CHANGELOG.md](CHANGELOG.md) (or the maintainer will fold it).

## Ideas API (`src/`, `tests/`)

If you change routes, env vars, or behavior: update [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and a line in [docs/DECISIONS.md](docs/DECISIONS.md).

## Showcase

If you use mstack in a public repo, add a row via PR to [docs/SHOWCASE.md](docs/SHOWCASE.md).

## Questions

See [docs/FAQ.md](docs/FAQ.md) and [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).
