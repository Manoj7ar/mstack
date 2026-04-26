#!/usr/bin/env bash
# Create a temporary consumer repo, sync mstack into it, and run doctor + scorecard.
# Usage:
#   MSTACK_PACK=standard bash scripts/mstack-demo-consumer.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PACK="${MSTACK_PACK:-standard}"
TMP="$(mktemp -d "${TMPDIR:-/tmp}/mstack-demo-consumer.XXXXXX")"

echo "mstack demo consumer"
echo "  pack: $PACK"
echo "  temp: $TMP"
echo

MSTACK_ROOT="$ROOT" MSTACK_PACK="$PACK" INIT_PROJECT_MEMORY=1 \
  bash "$ROOT/scripts/sync-mstack.sh" "$TMP"

if [[ -f "$ROOT/AGENTS.md" ]]; then
  cp "$ROOT/AGENTS.md" "$TMP/AGENTS.md"
  echo "Copied AGENTS.md into temp repo (demo-only; real repos should merge)."
fi

echo
echo "doctor:"
bash "$ROOT/scripts/mstack-doctor.sh" "$TMP"

echo
echo "scorecard:"
MSTACK_ROOT="$ROOT" MSTACK_PACK="$PACK" bash "$ROOT/scripts/mstack-scorecard.sh" "$TMP"

echo
echo "First Agent message to try in that temp repo:"
cat <<'MSG'
Use mstack phases. First, read AGENTS.md and docs/PROJECT_MEMORY.md if present.
Then do a quick adoption audit: explain which pack appears installed and suggest one first useful Agent task.
MSG

echo
echo "Open temp repo:"
echo "  $TMP"
echo "Cleanup when done:"
echo "  rm -rf \"$TMP\""
