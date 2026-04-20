# mstack workflow

mstack separates **cognitive modes** so planning, building, reviewing, and shipping do not blur in one undifferentiated session. Each phase has one job.

## Phases

| Phase | Purpose |
| ----- | ------- |
| **Think** | Clarify goal, constraints, unknowns; list assumptions; ask only for blocking decisions. |
| **Plan** | Architecture, file touch list, risks; use `templates/PLAN_TEMPLATE.md`. |
| **Build** | Minimal diff; follow repo patterns; no scope creep. |
| **Review** | Adversarial pass (correctness, edge cases); **no new features**. |
| **Test** | Proportionate coverage; use `templates/TEST_PLAN_TEMPLATE.md` when relevant. |
| **Ship** | Checklist: tests/lint if present, migrations, rollback notes. |
| **Reflect** | 3–5 bullets: what worked, what to automate next time. |

## Flow

```mermaid
flowchart LR
  think[Think]
  plan[Plan]
  build[Build]
  review[Review]
  test[Test]
  ship[Ship]
  reflect[Reflect]
  think --> plan --> build --> review --> test --> ship --> reflect
```

## Artifacts

- **Plan**: `templates/PLAN_TEMPLATE.md`
- **Test plan**: `templates/TEST_PLAN_TEMPLATE.md`
- **Design brief** (UI): `templates/DESIGN_BRIEF_TEMPLATE.md`
- **Debug session** (optional): `templates/DEBUG_SESSION_TEMPLATE.md`
- **Reflect**: `templates/REFLECT_TEMPLATE.md`
- **Postmortem** (incidents): `templates/POSTMORTEM_TEMPLATE.md` or `templates/INCIDENT_POSTMORTEM_TEMPLATE.md`
- **PR / ship**: `templates/PR_CHECKLIST_TEMPLATE.md`
- **Architecture decision**: `templates/ADR_TEMPLATE.md`
- **Repo memory** (this mstack checkout): `docs/AGENT_MEMORY.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md` — keep in sync when behavior or structure changes.

## Optional modes

- **Plan Mode**: for **complex features**, **unclear requirements**, or **many files/systems**, use Cursor **Plan Mode** — mode picker or **Shift+Tab**. Agent clarifies, researches the repo, and produces an **editable plan** before implementation; save to workspace when useful. See [Cursor Plan Mode](https://cursor.com/docs/agent/plan-mode).
- **Debug**: say *debug mode* or *mstack debug*, or **@mention** `@mstack-debug`. Follow `mstack-debug.mdc`. For bugs that need **runtime evidence**, use **Cursor Debug Mode**: open Agent, use the **mode picker** or press **Shift+Tab** to switch — see [Cursor Debug Mode](https://cursor.com/docs/agent/debug-mode). mstack requires **explicit user consent** before invasive instrumentation (extra logging, reproduce-for-logs). Without consent, stick to static analysis and suggest Debug Mode + permission when ready.
- **Security pass**: for auth/data/boundary changes, `mstack-security-review.mdc` applies when those files are in scope.
- **Destructive ops**: `mstack-permissions.mdc` — always confirm before `git reset --hard`, force push, `rm -rf`, DB drops, prod changes.

## Specialist rules

These `.mdc` files add focused guidance; most use `globs` so they apply when matching files are in scope. You can also **@mention** the rule name in chat (for example `@mstack-accessibility`).

| Rule file | When to use |
| --------- | ----------- |
| `mstack-frontend.mdc` | Components, styles, client UI implementation |
| `mstack-accessibility.mdc` | Keyboard, focus, semantics, assistive-tech-friendly UI |
| `mstack-design-research.mdc` | External UI references (with user permission for web research) |
| `mstack-backend.mdc` | APIs, validation, errors, service boundaries |
| `mstack-data-modeling.mdc` | Schema, migrations, SQL, ORM models |
| `mstack-data-migrations.mdc` | Narrow migration-folder safety (pairs with data modeling) |
| `mstack-testing-qa.mdc` | Tests, QA plans, repro steps |
| `mstack-review.mdc` | PR / code review posture (no feature creep) |
| `mstack-ci-quality.mdc` | CI workflows, lint, typecheck, repo-wide tooling |
| `mstack-ci.mdc` | Workflow YAML fixes (narrower than CI/quality) |
| `mstack-docs-devx.mdc` | README, docs, contributing guides, GitHub templates |
| `mstack-docs-ship.mdc` | Changelog / ship-oriented doc touchpoints |
| `mstack-dependencies.mdc` | Manifests and lockfiles |
| `mstack-security-review.mdc` | Auth, data protection, trust boundaries |
| `mstack-debug.mdc` | Structured debugging and permission for invasive steps |
| `mstack-permissions.mdc` | Destructive git, filesystem, DB, prod (always on when included) |
| `mstack-repo-memory.mdc` | This repo’s `docs/AGENT_MEMORY`, architecture, decisions |

## Cursor integration

Rules live in `.cursor/rules/` as `.mdc` files with YAML frontmatter. See [Cursor Rules](https://cursor.com/docs/rules) for `description`, `globs`, and apply modes.
