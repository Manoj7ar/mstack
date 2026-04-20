# Ideas API

Small HTTP API for capturing and organizing ideas with session-scoped preferences, validation, structured errors, request correlation IDs, and basic rate limiting.

## Run

```bash
npm install
npm run dev
```

Default port: `3000` (override with `PORT`). Optional: `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`.

## Endpoints

- `GET /health` — liveness
- `GET /v1/ideas?tag=` — list ideas (optional tag filter)
- `GET /v1/ideas/:id` — single idea
- `POST /v1/ideas` — create idea (JSON body: `title`, optional `summary`, `tags`). Headers: optional `X-Session-ID`, optional `Idempotency-Key`
- `PATCH /v1/session/preferences` — update preferences for a session. Header: `X-Session-ID` (required). Body: optional `defaultTags`, `summarizeTitles`

Responses include `X-Request-ID` and a JSON `requestId` field.

## Test / build

```bash
npm test
npm run lint
npm run build && npm start
```
