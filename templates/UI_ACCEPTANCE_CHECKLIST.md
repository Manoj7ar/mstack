# UI acceptance checklist

_Use before merging **user-visible** UI. Pair with **`@mstack-frontend`** and **`@mstack-accessibility`** as needed. Align copy/tone with **`docs/PROJECT_MEMORY.md`** if your project uses it._

**Screen / flow:**

## States

- [ ] **Loading** — skeleton or spinner; no layout jump (or documented exception)
- [ ] **Empty** — helpful message; clear next action
- [ ] **Error** — user-readable message; recovery path or support hint
- [ ] **Success** — matches product expectation; no silent failure

## Interaction

- [ ] **Focus** — logical tab order; visible focus; trap only where intentional (modals)
- [ ] **Keyboard** — primary actions reachable without mouse where reasonable
- [ ] **Forms** — labels, errors near fields, disabled vs loading states clear

## Layout

- [ ] **Responsive** — key breakpoint(s) checked (mobile + desktop or project standard)
- [ ] **Motion** — respects reduced-motion where applicable (`@mstack-accessibility`)

## Copy

- [ ] Terminology matches **`docs/PROJECT_MEMORY.md`** or team glossary (if present)

## Quick a11y spot-check

- [ ] **`@mstack-accessibility`** pass if new components, modals, or complex widgets
