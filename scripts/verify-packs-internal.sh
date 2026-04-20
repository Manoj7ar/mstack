#!/usr/bin/env bash
# For the mstack repo only: every rule listed in scripts/packs/*.txt exists under .cursor/rules/
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKS_DIR="$ROOT/scripts/packs"
RULES="$ROOT/.cursor/rules"
FAILED=0

for list in "$PACKS_DIR"/*.txt; do
  [[ -e "$list" ]] || continue
  name="$(basename "$list")"
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    [[ -z "$line" || "$line" == \#* ]] && continue
    base="$line"
    [[ "$base" == *.mdc ]] && base="${base%.mdc}"
    f="$RULES/${base}.mdc"
    if [[ ! -f "$f" ]]; then
      echo "verify-packs-internal: $name lists missing rule: ${base}.mdc" >&2
      FAILED=1
    fi
  done <"$list"
done

if [[ "$FAILED" -ne 0 ]]; then
  exit 1
fi

echo "verify-packs-internal: OK (all pack entries have .mdc files)"
