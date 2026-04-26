---
name: mstack-demo-consumer
description: Print a safe temp-directory demo command that syncs mstack into a clean consumer repo, then runs doctor and scorecard. Use when the user types /mstack-demo-consumer or asks to try mstack without touching their app.
disable-model-invocation: true
---

# mstack demo consumer (skill)

Print **copy-paste** commands for a clean-room mstack demo. The script creates a temp directory, syncs a pack, runs doctor + scorecard, and prints a first Agent message.

## When to use

- User invoked **`/mstack-demo-consumer`**.
- User asks to **try mstack safely**, **demo install**, or **see what sync creates** without touching their project.

## Output

```bash
# From the mstack repo root
MSTACK_PACK=standard bash scripts/mstack-demo-consumer.sh
```

Then explain:

- It writes only to a **temporary directory**.
- It does **not** modify the current repo or any user app.
- It prints the temp path and a cleanup command.
- Change pack with `MSTACK_PACK=minimal|lite|solo|standard|full`.

## See also

- [`docs/ADOPTION_SCORECARD.md`](../../docs/ADOPTION_SCORECARD.md)
- [`docs/STARTER_KIT.md`](../../docs/STARTER_KIT.md)
