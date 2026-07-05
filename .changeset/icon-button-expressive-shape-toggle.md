---
'@m3-baseui/core': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/react-vanilla-extract': major
---

feat(icon-button): M3 Expressive shape morph (round↔square) and toggle color revisions

Bring Icon Button up to M3 Expressive parity (Compose `{XSmall..XLarge}IconButtonTokens`
/ `FilledIconButtonTokens` / `FilledTonalIconButtonTokens` / `OutlinedIconButtonTokens`
14_1_0, issue #113). Both engines emit identical DOM/`data-*` (drop-in). The
XS–XL size and narrow/default/wide width systems are unchanged.

**New prop**

- `shape` (`round` | `square`, default `round`): square corners are
  XS·S 12 / M 16 / L·XL 28 dp. The corner morphs smaller on press
  (`PressedContainerShape`: XS·S 8 / M 12 / L·XL 16 dp). Toggle selection swaps
  to the opposite shape — a selected `round` container morphs to the square
  corner, a selected `square` container morphs to `full` (round↔square
  inversion, Expressive's signature toggle behavior).

**Breaking changes (visual)**

- **tonal toggle selected** now uses `secondary` + `on-secondary` (was the
  variant default `secondary-container`, which left selection visually
  indistinguishable — a bug fix).
- **filled toggle unselected** moves from `surface-container-highest` + `primary`
  to `surface-container` + `on-surface-variant`; **tonal toggle unselected** is
  the variant default `secondary-container` + `on-secondary-container`.
- **outlined outline** moves from `outline` to `outline-variant` (disabled
  included), with L 2dp / XL 3dp border widths.
- **filled/tonal disabled** container opacity 0.12 → 0.1 (outlined selected
  disabled container too).
- Motion now uses the `spring-effects-default` easing (critically damped, no
  bounce) per Compose `DefaultEffects`.

Refresh any visual-regression baselines.
