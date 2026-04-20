# Localization QA — [release or feature]

## Locales in scope

| Locale | Owner | Status |
| ------ | ----- | ------ |
| e.g. en | — | — |
| e.g. es | — | — |

## Pseudo-locale / long-string stress

- [ ] Long strings do not break layout (truncation, overflow, buttons)
- [ ] No clipped text in primary flows

## Formatting spot checks

- [ ] Dates and times (timezone policy documented)
- [ ] Numbers and currency
- [ ] Relative time (“2 hours ago”) if applicable

## RTL (if supported)

- [ ] Mirror-critical UI verified
- [ ] Keyboard / focus order still sensible (`mstack-accessibility`)

## Missing keys

- [ ] No silent empty strings in prod; fallback or telemetry policy agreed
