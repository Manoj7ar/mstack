# `src/` internal map (reference Ideas API)

Companion to [ARCHITECTURE.md](ARCHITECTURE.md). **Product vs demo:** repo npm name **`mstack`**; HTTP **`service`** id **`mstack-ideas-api`** ([version.ts](../src/version.ts)).

## Modules

| File | Role |
| ---- | ---- |
| [server.ts](../src/server.ts) | `createAppServer(opts?)`, `handleRequest`, routing, JSON errors, rate limit gate, **`/v1/meta`** (`product` + `service`) |
| [store.ts](../src/store.ts) | `IdeasStore` interface; `InMemoryIdeasStore`; `FileIdeasStore` (`IDEAS_STORE_PATH`); idempotency fingerprint + **409** on mismatch |
| [schemas.ts](../src/schemas.ts) | Zod schemas for create/patch idea + session prefs |
| [rateLimit.ts](../src/rateLimit.ts) | Sliding window per client key; `resetRateLimitState()` for tests |
| [logger.ts](../src/logger.ts) | Structured stdout logs |
| [openapi.ts](../src/openapi.ts) | `openApiDocument()` — served at `GET /v1/openapi.json` |
| [version.ts](../src/version.ts) | `REPO_PRODUCT_NAME`, `SERVICE_NAME`, `API_VERSION` |

## Request flow (summary)

1. Generate or echo `X-Request-ID`.
2. `checkRateLimit(clientKey)` — **429** + `Retry-After` when over limit.
3. Dispatch method/path; parse JSON; Zod validate → **422** with `details` when invalid.
4. Store ops; **409** on idempotency body mismatch for `POST /v1/ideas`.

## Environment

| Variable | Purpose |
| -------- | ------- |
| `PORT` | Listen port (default `3000`) |
| `RATE_LIMIT_MAX` | Requests per window (default `120`) |
| `RATE_LIMIT_WINDOW_MS` | Window ms (default `60000`) |
| `IDEAS_STORE_PATH` | Optional JSON file for `FileIdeasStore` |

## Tests

[tests/server.test.ts](../tests/server.test.ts) uses `createAppServer({ rateLimitMax, store })` for isolation. Default server uses `InMemoryIdeasStore` or file store when `IDEAS_STORE_PATH` is set at process start.
