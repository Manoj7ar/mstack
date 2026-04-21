# Example debug session snippet

_Align with [templates/DEBUG_SESSION_TEMPLATE.md](../../templates/DEBUG_SESSION_TEMPLATE.md)._

## Symptom

`POST /v1/ideas` returns **409** with `idempotency_conflict` unexpectedly.

## Hypothesis

Client retries with the same `Idempotency-Key` but a **different** JSON body (whitespace or tag order).

## Evidence

- Compare request bodies; fingerprint is over normalized title/summary/tags ([src/store.ts](../../src/store.ts) `createBodyFingerprint`).
- Reproduce with two `curl` calls same key, different `title`.

## Fix direction

- Client: use a **new** key per logical operation, or send byte-identical body on retry.
- Server: already returns **409**; document in OpenAPI (see `POST /v1/ideas`).

## Consent

_No invasive logging added; used local `npm test` only._
