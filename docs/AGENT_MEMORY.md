# Agent memory — how to use this repository

This file is **durable context** for Cursor and other agents. Read it when starting non-trivial work so behavior stays consistent with how the repo is meant to run.

## What this repo is

1. **mstack** — A **Cursor rules pack** (`.cursor/rules/mstack-*.mdc`, `AGENTS.md`, `templates/`) for phased work and token discipline. It is meant to be **copied or submodule’d** into other projects.
2. **Ideas HTTP API** — An optional **Node/TypeScript** service under `src/` and `tests/` that demonstrates structured APIs (validation, sessions, rate limits). It is **in-memory only**; restarting the process clears data.

## Where to look first

| Question | Read |
| -------- | ---- |
| Phases, handoffs, templates | [workflow.md](workflow.md), `AGENTS.md`, `templates/` |
| **System map** (dirs, API, data flow) | [ARCHITECTURE.md](ARCHITECTURE.md) |
| **Why** something is the way it is | [DECISIONS.md](DECISIONS.md) |
| Human install / copy instructions | [README.md](../README.md) |

## Conventions for agents

- **Update memory when behavior changes**: If you add routes, change env vars, or alter the purpose of a folder, edit `docs/ARCHITECTURE.md` and add a short entry to `docs/DECISIONS.md`.
- **Prefer small diffs** that match existing TypeScript and markdown style.
- **Rules**: `mstack-core-workflow.mdc` is `alwaysApply`. Specialist rules use `globs`; use `@rule-name` when you need a posture that is not file-scoped.

## Glossary

- **Session** — Identified by `X-Session-ID`; drives default tags and title summarization for new ideas (and tag merge on updates where applicable).
- **Request ID** — `X-Request-ID` header on responses; pass through for support and log correlation.
