#!/usr/bin/env bash
# verify-setup.sh — quick sanity check for @m3-baseui integration in a consumer repo.
# Run from the project root: bash path/to/verify-setup.sh

set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

errors=0
warnings=0

fail() { echo "ERROR: $1"; errors=$((errors + 1)); }
warn() { echo "WARN:  $1"; warnings=$((warnings + 1)); }
ok()   { echo "OK:    $1"; }

echo "=== @m3-baseui setup verification ==="
echo "Root: $(pwd)"
echo

# --- package.json ---
if [[ ! -f package.json ]]; then
  fail "No package.json found in $(pwd)"
  echo
  echo "Result: $errors error(s), $warnings warning(s)"
  exit 1
fi

has_dep() {
  node -e "
    const p = require('./package.json');
    const deps = { ...p.dependencies, ...p.devDependencies, ...p.peerDependencies };
    process.exit(deps['$1'] ? 0 : 1);
  " 2>/dev/null
}

engine=""
if has_dep '@m3-baseui/react-tailwind'; then
  engine="tailwind"
fi
if has_dep '@m3-baseui/react-vanilla-extract'; then
  if [[ -n "$engine" ]]; then
    fail "Both @m3-baseui/react-tailwind and @m3-baseui/react-vanilla-extract are installed — pick one engine"
  fi
  engine="ve"
fi

if [[ -z "$engine" ]]; then
  fail "No @m3-baseui engine package in package.json"
elif [[ "$engine" == "tailwind" ]]; then
  ok "Found @m3-baseui/react-tailwind"
else
  ok "Found @m3-baseui/react-vanilla-extract"
fi

if has_dep '@base-ui/react'; then
  ok "Found @base-ui/react peer dependency"
else
  warn "@base-ui/react not in package.json (required peer dependency)"
fi

if has_dep '@otomatty/react-tailwind' || has_dep '@otomatty/react-vanilla-extract'; then
  warn "Legacy @otomatty/* packages still in package.json — migrate to @m3-baseui/*"
fi

# --- CSS wiring ---
css_files=$(find . -name '*.css' \
  ! -path './node_modules/*' \
  ! -path './dist/*' \
  ! -path './.next/*' \
  ! -path './storybook-static/*' 2>/dev/null || true)

has_tokens_import=false
has_source=false
has_preset=false

while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  if grep -Eq '^[[:space:]]*@import.*@m3-baseui/(tokens/tokens\.css|react-tailwind/preset\.css)' "$f" 2>/dev/null; then
    has_tokens_import=true
  fi
  if grep -Eq '^[[:space:]]*@import.*@m3-baseui/react-tailwind/preset\.css' "$f" 2>/dev/null; then
    has_preset=true
  fi
  if grep -Eq '^[[:space:]]*@source.*(@m3-baseui/react-tailwind|react-tailwind)' "$f" 2>/dev/null; then
    has_source=true
  fi
done <<< "$css_files"

if [[ "$engine" == "tailwind" ]]; then
  if $has_tokens_import || $has_preset; then
    ok "M3 CSS preset or tokens import found"
  else
    fail "No @m3-baseui/react-tailwind/preset.css or tokens.css import in CSS files"
  fi
  if $has_source; then
    ok "@source for @m3-baseui/react-tailwind found"
  else
    fail "Missing @source for @m3-baseui/react-tailwind (use node_modules/.../dist in published apps, or packages/react-tailwind/src in monorepos)"
  fi
elif [[ "$engine" == "ve" ]]; then
  if $has_tokens_import; then
    ok "tokens.css import found"
  else
    fail "No @m3-baseui/tokens/tokens.css import in CSS files"
  fi
fi

# --- ThemeProvider usage ---
tsx_files=$(find . \( -name '*.tsx' -o -name '*.jsx' \) \
  ! -path './node_modules/*' \
  ! -path './dist/*' \
  ! -path './.next/*' 2>/dev/null || true)

has_theme_provider=false
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  if grep -Eq '<ThemeProvider|ThemeProvider[[:space:]]*>' "$f" 2>/dev/null; then
    has_theme_provider=true
    break
  fi
done <<< "$tsx_files"

if $has_theme_provider; then
  ok "ThemeProvider usage found"
else
  warn "No ThemeProvider found in .tsx/.jsx files — wrap your app root"
fi

# --- Summary ---
echo
if [[ $errors -eq 0 ]]; then
  echo "Result: PASS ($warnings warning(s))"
  exit 0
else
  echo "Result: FAIL ($errors error(s), $warnings warning(s))"
  exit 1
fi
