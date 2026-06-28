---
"@m3-baseui/tokens": patch
---

Fix Tailwind v4 dynamic color: emit `rgb(var(--md-sys-color-*))` instead of `rgb(var(--md-sys-color-*) / <alpha-value>)` in the generated `theme.css`. Tailwind v4's `@theme` block does not substitute the v3 `<alpha-value>` placeholder, which left every `--color-*` token as an invalid color and caused color utilities (`bg-primary`, `text-on-primary`, `border-outline`, …) to fall back to transparent / `currentColor`. v4 derives opacity modifiers via `color-mix()` off the bare value, so the placeholder is unnecessary.
