---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/core': major
---

Toolbar now follows the Material 3 Expressive spec more closely (issue #120).

Aligned to Compose `FloatingToolbarTokens` / `DockedToolbarTokens` +
`FloatingToolbar.kt`. Both engines emit identical DOM / `data-*` (drop-in).

**New prop:**

- `type` (`floating` | `docked`, default `floating`). `docked` is a
  square-cornered, full-width `surface-container` bar (`DockedToolbarTokens`:
  64dp height, 16dp leading/trailing, 4–32dp spacing) mirrored onto `data-type`.

**Breaking (visual — no API/DOM changes):**

- **Floating elevation `level3` → `level0`** (no shadow) — Compose `FloatingToolbar`
  defaults to Level0.
- **Standard content color `on-surface-variant` → `on-surface`**
  (`contentColorFor(SurfaceContainer)`). (Interactive children paint their own
  color, so this only affects direct text content.)

**Motion:** a `data-expanded="false"` hook collapses the bar (scale + fade) with
the fast spatial spring, for consumer-driven show/hide.

Deferred: the vibrant toggle-*selected* inversion (a selected action flipping to
surface-container / on-surface) and full unification of the vibrant child-color
mechanism are left for a follow-up — both require overriding IconButton's own
colors, which cannot be done drop-in via CSS specificity alone (it would need
`!important`, which vanilla-extract does not support).
