#!/usr/bin/env bash
# Verify consumer repo .cursor/rules matches scripts/packs/<pack>.txt (or full source set for "all").
# Usage: MSTACK_ROOT=vendor/mstack ./scripts/verify-mstack-sync.sh [--strict] <pack> [dest]
#   pack: minimal | lite | standard | full | all
#   dest: consumer root (default .)
#   --strict: fail if dest has extra mstack-*.mdc files not listed in the pack (or not in source for "all")
set -euo pipefail

ROOT="${MSTACK_ROOT:-vendor/mstack}"
STRICT=0
ARGS=()
for arg in "$@"; do
  if [[ "$arg" == "--strict" ]]; then
    STRICT=1
  else
    ARGS+=("$arg")
  fi
done

if [[ ${#ARGS[@]} -lt 1 ]]; then
  echo "Usage: MSTACK_ROOT=<mstack-checkout> $0 [--strict] <pack> [dest]" >&2
  echo "  pack: minimal | lite | standard | full | all" >&2
  echo "  dest: consumer repo root (default .)" >&2
  exit 2
fi

PACK="${ARGS[0]}"
DEST="${ARGS[1]:-.}"

if [[ ! -d "$ROOT/.cursor/rules" ]]; then
  echo "Expected $ROOT/.cursor/rules (set MSTACK_ROOT=...)." >&2
  exit 1
fi

RULES_DIR="$DEST/.cursor/rules"
if [[ ! -d "$RULES_DIR" ]]; then
  echo "Missing $RULES_DIR" >&2
  exit 1
fi

EXPECTED_FILE="$(mktemp)"
ACTUAL_FILE="$(mktemp)"
cleanup() { rm -f "$EXPECTED_FILE" "$ACTUAL_FILE"; }
trap cleanup EXIT

if [[ "$PACK" == "all" ]]; then
  for src in "$ROOT"/.cursor/rules/mstack-*.mdc; do
    [[ -e "$src" ]] || continue
    basename "$src"
  done | sort >"$EXPECTED_FILE"
else
  PACK_FILE="$ROOT/scripts/packs/${PACK}.txt"
  if [[ ! -f "$PACK_FILE" ]]; then
    echo "Unknown pack '$PACK' or missing $PACK_FILE" >&2
    exit 1
  fi
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    [[ -z "$line" || "$line" == \#* ]] && continue
    base="$line"
    [[ "$base" == *.mdc ]] && base="${base%.mdc}"
    echo "${base}.mdc"
  done <"$PACK_FILE" | sort -u >"$EXPECTED_FILE"
fi

shopt -s nullglob
for f in "$RULES_DIR"/mstack-*.mdc; do
  basename "$f"
done | sort >"$ACTUAL_FILE"

MISSING=0
while IFS= read -r want || [[ -n "$want" ]]; do
  [[ -z "$want" ]] && continue
  if ! grep -qxF "$want" "$ACTUAL_FILE"; then
    echo "Missing rule in $RULES_DIR: $want" >&2
    MISSING=1
  fi
done <"$EXPECTED_FILE"

EXTRA=0
if [[ "$STRICT" == "1" ]]; then
  while IFS= read -r have || [[ -n "$have" ]]; do
    [[ -z "$have" ]] && continue
    if ! grep -qxF "$have" "$EXPECTED_FILE"; then
      echo "Extra rule in $RULES_DIR (not in pack '$PACK'): $have" >&2
      EXTRA=1
    fi
  done <"$ACTUAL_FILE"
fi

if [[ "$MISSING" -ne 0 || "$EXTRA" -ne 0 ]]; then
  exit 1
fi

echo "OK: $DEST matches mstack pack '$PACK'${STRICT:+ (strict)}"
