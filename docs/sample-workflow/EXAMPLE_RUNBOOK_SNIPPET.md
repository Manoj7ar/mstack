# Runbook snippet — reference Ideas API

_For production you would expand [templates/RUNBOOK_TEMPLATE.md](../../templates/RUNBOOK_TEMPLATE.md); this is demo-only._

## Run locally

```bash
npm install
npm run dev
# → http://127.0.0.1:3000/health
```

## Optional persistence

```bash
IDEAS_STORE_PATH=./data/ideas.json npm run dev
```

## Verify

```bash
npm run lint && npm test
```

## Meta / OpenAPI

- `GET /v1/meta` — `product`, `service`, `apiVersion`
- `GET /v1/openapi.json` — spec

## Snapshot (flight deck / Canvas)

```bash
node scripts/ideas-snapshot.mjs
```
