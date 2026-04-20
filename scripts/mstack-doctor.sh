#!/usr/bin/env bash
# Local sanity checks for mstack adoption in a consumer repo (or this repo).
# Usage: ./scripts/mstack-doctor.sh [dest]
#   dest: repo root (default .)
# Optional: MSTACK_ROOT + MSTACK_PACK set → also run verify-mstack-sync.sh against dest
# Optional: MSTACK_VERIFY_STRICT=1 → pass --strict to verify
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$(cd "${1:-.}" && pwd)"
RULES="$DEST/.cursor/rules"

ERR=0

if [[ ! -d "$RULES" ]]; then
  echo "mstack-doctor: missing $RULES" >&2
  exit 1
fi

for need in mstack-core-workflow.mdc mstack-token-discipline.mdc mstack-permissions.mdc; do
  if [[ ! -f "$RULES/$need" ]]; then
    echo "mstack-doctor: missing required rule $RULES/$need" >&2
    ERR=1
  fi
done

if [[ ! -f "$DEST/AGENTS.md" ]]; then
  echo "mstack-doctor: warning: no AGENTS.md at $DEST (merge or add project bootstrap)" >&2
fi

if [[ "$ERR" -ne 0 ]]; then
  exit 1
fi

if [[ -n "${MSTACK_PACK:-}" && -n "${MSTACK_ROOT:-}" ]]; then
  VERIFY=("$SCRIPT_DIR/verify-mstack-sync.sh")
  [[ "${MSTACK_VERIFY_STRICT:-0}" == "1" ]] && VERIFY+=(--strict)
  VERIFY+=("$MSTACK_PACK" "$DEST")
  MSTACK_ROOT="$MSTACK_ROOT" "${VERIFY[@]}"
fi

echo "mstack-doctor: OK ($DEST)"
