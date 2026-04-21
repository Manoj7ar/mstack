# Anti-patterns (Cursor + mstack)

Common ways teams **waste context**, **weaken rules**, or **increase risk**—with a concrete fix. For reactive fixes, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md). For token habits, [TOKEN_LEVERS.md](TOKEN_LEVERS.md).

---

1. **`@` the whole repo or giant trees every message**  
   **Symptom:** Slow, expensive threads; agent “knows” too much irrelevant code.  
   **Fix:** [CONTEXT_BUDGET.md](CONTEXT_BUDGET.md), **`/mstack-context-budget`**, narrow paths in [PLAYBOOK_FIRST_MESSAGES.md](PLAYBOOK_FIRST_MESSAGES.md).

2. **Two conflicting sources of truth for bootstrap**  
   **Symptom:** Agent follows one `AGENTS.md` in one chat and a different paste in another.  
   **Fix:** Single merged **`AGENTS.md`** at repo root; use **`AGENTS.md.mstack-snippet`** from sync only as a merge aid ([STARTER_KIT.md](STARTER_KIT.md)).

3. **Full pack on a tiny or scripts-only repo**  
   **Symptom:** Rule overload; specialists fight for attention.  
   **Fix:** [PACKS.md](PACKS.md) — **`minimal`**, **`lite`**, or **`solo`**; trim overlap [SPECIALIST_MAP.md](SPECIALIST_MAP.md).

4. **Expecting Tab / inline edit to obey project rules like Agent**  
   **Symptom:** “Why didn’t mstack apply?”  
   **Fix:** [CURSOR_LIMITS.md](CURSOR_LIMITS.md), [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md) — use **Agent** when you need rule-consistent behavior.

5. **Skipping doctor / verify after sync or submodule bump**  
   **Symptom:** Missing `.mdc`, wrong pack, drift for weeks.  
   **Fix:** [STARTER_KIT.md](STARTER_KIT.md), [VENDOR_UPGRADE.md](VENDOR_UPGRADE.md), **`/mstack-upgrade-vendor`**, [POWER_USER.md](POWER_USER.md).

6. **Never updating `SESSION_BRIEF.md` or recap on handoff**  
   **Symptom:** Every new chat re-explores the repo from zero.  
   **Fix:** [PLAYBOOK.md](PLAYBOOK.md), **`/mstack-lean-handoff`**, [SESSION_BRIEF_TEMPLATE.md](../templates/SESSION_BRIEF_TEMPLATE.md).

7. **MCP wired to prod data with no review**  
   **Symptom:** Accidental reads/writes or leaked scope via a server tool.  
   **Fix:** [CURSOR_MCP.md](CURSOR_MCP.md), **`@mstack-permissions`**, org allowlists; prefer read-only dev scopes.

8. **Pasting secrets into chat “for MCP”**  
   **Symptom:** Credentials in logs or history.  
   **Fix:** **`@mstack-secrets-env`**, env-based config, [SECRETS_AND_ENV_CHECKLIST.md](../templates/SECRETS_AND_ENV_CHECKLIST.md).

9. **“Just copy rules” without merge or pack choice**  
   **Symptom:** Half-installed mstack; `AGENTS.md` still generic.  
   **Fix:** [STARTER_KIT.md](STARTER_KIT.md), **`/mstack-first-sync`**, [ADOPTION_AUDIT.md](ADOPTION_AUDIT.md).

10. **Ceremony on every one-line chore**  
    **Symptom:** Extra turns and fatigue.  
    **Fix:** **`@mstack-mechanical-pass`**, [EFFECTIVENESS.md](EFFECTIVENESS.md) — compress phases when risk is low.

11. **Ignoring globs: specialist never fires**  
    **Symptom:** “`@mstack-frontend` never shows up.”  
    **Fix:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — paths don’t match; adjust globs or use manual `@mention`.

12. **Remote rule import without templates/skills**  
    **Symptom:** Rules only; no `/mstack-*` or templates in consumer repo.  
    **Fix:** [RULES_SOURCE.md](RULES_SOURCE.md) — know the tradeoff; vendor + sync if you want the full pack.

---

## See also

- [GLOSSARY.md](GLOSSARY.md) — terms  
- [EFFECTIVENESS.md](EFFECTIVENESS.md) — when mstack pays off  
- [DOCS_MAP.md](DOCS_MAP.md) — where to read next
