# Specialist map — pick one when slimming

Use this when **Full** or **Standard** feels noisy: keep the **primary** rule; drop or **@mention** the **alternate**.

| Topic | Primary (broader) | Alternate (narrower) | Note |
| ----- | ----------------- | -------------------- | ---- |
| Contributor docs | `mstack-docs-devx` | `mstack-docs-ship` | DevEx = onboarding/CONTRIBUTING; ship = changelog/release blurbs |
| CI health | `mstack-ci-quality` | `mstack-ci` | Quality = lint/tsconfig + workflow posture; CI = targeted YAML fixes |
| Schema / SQL | `mstack-data-modeling` | `mstack-data-migrations` | Modeling = evolution; migrations = folder-level safety |
| Security vs secrets vs privacy | `mstack-security-review` | `mstack-secrets-env`, `mstack-privacy-data-handling` | Security = auth/boundary pass; secrets = env/CI; privacy = retention/export (**full**) |

**Feature flags** (`mstack-feature-flags`) overlap **backend** for flag evaluation—keep flags rule when you touch flag SDKs; backend for generic API logic.

**Do not** delete `mstack-core-workflow`, `mstack-token-discipline`, or `mstack-permissions` unless you fully understand the tradeoff.

Custom pack: copy a `scripts/packs/*.txt` to your repo and trim (see [PACKS.md](PACKS.md) **Custom**).
