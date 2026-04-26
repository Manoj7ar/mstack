#!/usr/bin/env bash
# Score how completely mstack is installed in a consumer repo (or this repo).
# Usage: bash scripts/mstack-scorecard.sh [dest]
# Optional:
#   MSTACK_ROOT=vendor/mstack MSTACK_PACK=standard bash vendor/mstack/scripts/mstack-scorecard.sh .
#   MSTACK_VERIFY_STRICT=1 ...   # strict pack verification
#   MSTACK_SCORE_JSON=1 ...      # machine-readable summary
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$(cd "${1:-.}" && pwd)"
RULES_DIR="$DEST/.cursor/rules"

SCORE=0
WARNINGS=()
NEXT=()

add_score() {
  SCORE=$((SCORE + $1))
}

warn() {
  WARNINGS+=("$1")
}

next_step() {
  NEXT+=("$1")
}

has_file() {
  [[ -f "$1" ]]
}

has_dir() {
  [[ -d "$1" ]]
}

required_rule_score() {
  local missing=0
  local rules=(
    "mstack-core-workflow.mdc"
    "mstack-token-discipline.mdc"
    "mstack-permissions.mdc"
  )

  if ! has_dir "$RULES_DIR"; then
    warn "missing .cursor/rules directory"
    next_step "Run sync-mstack.sh from the consumer repo root."
    return
  fi

  for rule in "${rules[@]}"; do
    if has_file "$RULES_DIR/$rule"; then
      add_score 15
    else
      missing=1
      warn "missing required rule: $rule"
    fi
  done

  if [[ "$missing" -ne 0 ]]; then
    next_step "Re-sync your chosen pack, then run mstack-doctor."
  fi
}

pack_verify_score() {
  if [[ -z "${MSTACK_ROOT:-}" || -z "${MSTACK_PACK:-}" ]]; then
    warn "pack verification skipped (set MSTACK_ROOT and MSTACK_PACK)"
    next_step "Set MSTACK_ROOT and MSTACK_PACK to verify install drift."
    return
  fi

  local verify_script="$MSTACK_ROOT/scripts/verify-mstack-sync.sh"
  if [[ ! -x "$verify_script" && ! -f "$verify_script" ]]; then
    warn "cannot find verify script at $verify_script"
    next_step "Check MSTACK_ROOT points at the mstack checkout."
    return
  fi

  local verify_args=()
  [[ "${MSTACK_VERIFY_STRICT:-0}" == "1" ]] && verify_args+=(--strict)
  verify_args+=("$MSTACK_PACK" "$DEST")

  if MSTACK_ROOT="$MSTACK_ROOT" bash "$verify_script" "${verify_args[@]}" >/dev/null 2>&1; then
    add_score 15
  else
    warn "pack verification failed for '$MSTACK_PACK'"
    next_step "Run verify-mstack-sync.sh directly to see missing or extra rules."
  fi
}

optional_score() {
  if has_file "$DEST/AGENTS.md"; then
    add_score 15
  else
    warn "missing AGENTS.md"
    next_step "Merge AGENTS.md or AGENTS.md.mstack-snippet into your repo root."
  fi

  if has_dir "$DEST/.cursor/skills"; then
    add_score 8
  else
    warn "missing .cursor/skills (optional but useful)"
  fi

  if has_dir "$DEST/templates"; then
    add_score 7
  else
    warn "missing templates directory"
  fi

  if has_file "$DEST/docs/PROJECT_MEMORY.md"; then
    add_score 5
  else
    warn "missing docs/PROJECT_MEMORY.md"
  fi

  if has_file "$DEST/SESSION_BRIEF.md" || has_file "$DEST/docs/AGENT_RECAP.md"; then
    add_score 5
  else
    warn "no SESSION_BRIEF.md or docs/AGENT_RECAP.md handoff file yet"
  fi
}

band_for_score() {
  if [[ "$SCORE" -ge 85 ]]; then
    echo "excellent"
  elif [[ "$SCORE" -ge 70 ]]; then
    echo "good"
  elif [[ "$SCORE" -ge 40 ]]; then
    echo "partial"
  else
    echo "not installed"
  fi
}

json_array() {
  local first=1
  printf '['
  for item in "$@"; do
    [[ "$first" -eq 0 ]] && printf ','
    first=0
    item="${item//\\/\\\\}"
    item="${item//\"/\\\"}"
    printf '"%s"' "$item"
  done
  printf ']'
}

required_rule_score
pack_verify_score
optional_score

BAND="$(band_for_score)"

if [[ "${MSTACK_SCORE_JSON:-0}" == "1" ]]; then
  printf '{"dest":"%s","score":%s,"band":"%s","warnings":' "$DEST" "$SCORE" "$BAND"
  json_array "${WARNINGS[@]}"
  printf ',"next":'
  json_array "${NEXT[@]}"
  printf '}\n'
else
  echo "mstack-scorecard: $SCORE/100 ($BAND)"
  echo "repo: $DEST"
  if [[ "${#WARNINGS[@]}" -gt 0 ]]; then
    echo
    echo "Warnings:"
    for warning in "${WARNINGS[@]}"; do
      echo "- $warning"
    done
  fi
  if [[ "${#NEXT[@]}" -gt 0 ]]; then
    echo
    echo "Next steps:"
    for step in "${NEXT[@]}"; do
      echo "- $step"
    done
  fi
fi

if [[ "$SCORE" -lt 40 ]]; then
  exit 1
fi
