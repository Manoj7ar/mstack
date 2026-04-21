# Hotfix or rollback checklist

_Use for **production-impacting** or **time-critical** changes. Not legal or incident-command advice — align with your org’s process. After stability, use **`templates/POSTMORTEM_TEMPLATE.md`**._

**Incident / change ID:**  
**Owner:**  
**Started:** YYYY-MM-DD HH:MM (timezone)

## Scope

- **What broke or what must ship:** (one paragraph)
- **Blast radius:** (users, regions, data)

## Risk and gates

- [ ] User confirmed **destructive** or **prod** actions (`mstack-permissions`) where applicable
- [ ] **Secrets** not pasted in chat; env changes tracked (`mstack-secrets-env` if relevant)

## Comms (as needed)

- **Status page / stakeholders:** (who was notified, or N/A)
- **Customer-facing message:** (draft or link, or N/A)

## Change or revert strategy

- **Preferred fix:** (PR / patch summary)
- **Rollback:** (revert commit, feature flag off, redeploy previous image — pick one)
- **Data / migration:** (none / forward-only / backfill — note risks)

## Verify

- **Commands run:** (e.g. tests, smoke URL, health check)
- **Monitoring:** (dashboards or logs checked — short note)

## Post-incident

- [ ] **`templates/POSTMORTEM_TEMPLATE.md`** or org template scheduled
- [ ] **`docs/PROJECT_MEMORY.md`** or runbook updated if a standing lesson was learned
