#!/usr/bin/env bash
# Copy mstack rules and templates from a vendored path into the current repo root.
# Usage: MSTACK_ROOT=vendor/mstack ./scripts/sync-mstack.sh
set -euo pipefail

ROOT="${MSTACK_ROOT:-vendor/mstack}"
DEST="${1:-.}"

if [[ ! -d "$ROOT/.cursor/rules" ]]; then
  echo "Expected $ROOT/.cursor/rules (set MSTACK_ROOT=... to your mstack checkout)." >&2
  exit 1
fi

mkdir -p "$DEST/.cursor/rules" "$DEST/templates"
cp "$ROOT"/.cursor/rules/mstack-*.mdc "$DEST/.cursor/rules/"
cp "$ROOT"/templates/*.md "$DEST/templates/" 2>/dev/null || true
echo "Synced mstack rules and templates from $ROOT into $DEST"
