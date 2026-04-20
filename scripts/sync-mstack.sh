#!/usr/bin/env bash
# Copy mstack rules and templates from a vendored path into the current repo root.
# Usage: MSTACK_ROOT=vendor/mstack ./scripts/sync-mstack.sh
# Optional: SYNC_AGENTS_SNIPPET=1 writes AGENTS.md.mstack-snippet for manual merge into your AGENTS.md.
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

if [[ "${SYNC_AGENTS_SNIPPET:-0}" == "1" ]]; then
  if [[ ! -f "$ROOT/AGENTS.md" ]]; then
    echo "SYNC_AGENTS_SNIPPET=1 set but $ROOT/AGENTS.md not found." >&2
    exit 1
  fi
  SNIPPET="$DEST/AGENTS.md.mstack-snippet"
  {
    echo "<!-- BEGIN mstack AGENTS.md snippet — merge into your AGENTS.md; do not commit this file unless intended -->"
    cat "$ROOT/AGENTS.md"
    echo "<!-- END mstack AGENTS.md snippet -->"
  } >"$SNIPPET"
  echo "Wrote $SNIPPET (merge into your AGENTS.md manually)"
fi

echo "Synced mstack rules and templates from $ROOT into $DEST"
