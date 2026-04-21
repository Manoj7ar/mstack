#!/usr/bin/env bash
# Recommended local verification before PRs (this repo does not run GitHub Actions).
# Usage (from repo root): npm run mstack:ci  or  bash scripts/mstack-ci-local.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

export NODE_ENV="${NODE_ENV:-development}"
export NPM_CONFIG_PRODUCTION="${NPM_CONFIG_PRODUCTION:-false}"

echo "== Install (parity with CI) =="
npm ci --include=dev

echo "== Pack manifest integrity =="
npm run mstack:verify-packs

echo "== Doctor =="
npm run mstack:doctor

echo "== Doctor + full strict verify =="
MSTACK_ROOT="$ROOT" MSTACK_PACK=full MSTACK_VERIFY_STRICT=1 bash scripts/mstack-doctor.sh .

echo "== Sync smoke (minimal, standard, full strict) =="
for p in minimal standard full; do
  d="$(mktemp -d)"
  MSTACK_PACK="$p" MSTACK_ROOT="$ROOT" bash scripts/sync-mstack.sh "$d"
  MSTACK_ROOT="$ROOT" bash scripts/verify-mstack-sync.sh --strict "$p" "$d"
done

echo "== Lint =="
npm run lint

echo "== Test =="
npm test

echo "mstack-ci-local: OK"
