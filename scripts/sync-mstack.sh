#!/usr/bin/env bash
# Copy mstack rules and templates from a vendored path into the current repo root.
# Usage: MSTACK_ROOT=vendor/mstack ./scripts/sync-mstack.sh [DEST]
#
# MSTACK_PACK: minimal | lite | solo | standard | full | all (default: all — copy every mstack-*.mdc)
# SYNC_TEMPLATES: 1 (default) copy templates/*.md; 0 skip
# INIT_PROJECT_MEMORY: 1 creates DEST/docs/PROJECT_MEMORY.md from template if missing
# SYNC_AGENTS_SNIPPET: 1 writes AGENTS.md.mstack-snippet for manual merge
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="${MSTACK_ROOT:-vendor/mstack}"
DEST="${1:-.}"
MSTACK_PACK="${MSTACK_PACK:-all}"
SYNC_TEMPLATES="${SYNC_TEMPLATES:-1}"
INIT_PROJECT_MEMORY="${INIT_PROJECT_MEMORY:-0}"

if [[ ! -d "$ROOT/.cursor/rules" ]]; then
  echo "Expected $ROOT/.cursor/rules (set MSTACK_ROOT=... to your mstack checkout)." >&2
  exit 1
fi

mkdir -p "$DEST/.cursor/rules"

if [[ "$MSTACK_PACK" == "all" ]]; then
  cp "$ROOT"/.cursor/rules/mstack-*.mdc "$DEST/.cursor/rules/"
else
  PACK_FILE="$ROOT/scripts/packs/${MSTACK_PACK}.txt"
  if [[ ! -f "$PACK_FILE" ]]; then
    echo "Unknown MSTACK_PACK='$MSTACK_PACK' or missing $PACK_FILE" >&2
    exit 1
  fi
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    [[ -z "$line" || "$line" == \#* ]] && continue
    base="$line"
    [[ "$base" == *.mdc ]] && base="${base%.mdc}"
    src="$ROOT/.cursor/rules/${base}.mdc"
    if [[ ! -f "$src" ]]; then
      echo "Warning: pack lists $base but missing $src — skipping" >&2
      continue
    fi
    cp "$src" "$DEST/.cursor/rules/"
  done <"$PACK_FILE"
fi

if [[ "$SYNC_TEMPLATES" == "1" ]]; then
  mkdir -p "$DEST/templates"
  cp "$ROOT"/templates/*.md "$DEST/templates/" 2>/dev/null || true
fi

if [[ "$INIT_PROJECT_MEMORY" == "1" ]]; then
  PM="$DEST/docs/PROJECT_MEMORY.md"
  TPL="$ROOT/templates/PROJECT_MEMORY_TEMPLATE.md"
  if [[ ! -f "$PM" ]]; then
    if [[ -f "$TPL" ]]; then
      mkdir -p "$DEST/docs"
      cp "$TPL" "$PM"
      echo "Created $PM from PROJECT_MEMORY_TEMPLATE.md"
    else
      echo "INIT_PROJECT_MEMORY=1 but $TPL not found — skipping" >&2
    fi
  else
    echo "INIT_PROJECT_MEMORY=1: $PM already exists — not overwriting"
  fi
fi

if [[ -d "$ROOT/.cursor/skills" ]]; then
  mkdir -p "$DEST/.cursor/skills"
  cp -R "$ROOT"/.cursor/skills/* "$DEST/.cursor/skills/"
fi

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

echo "Synced from $ROOT into $DEST (MSTACK_PACK=$MSTACK_PACK, SYNC_TEMPLATES=$SYNC_TEMPLATES)"
