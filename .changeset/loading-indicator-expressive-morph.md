---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/core': major
---

LoadingIndicator now follows the Material 3 Expressive spec (issue #115).

Aligned to Compose `LoadingIndicatorTokens` + `LoadingIndicator.kt`. Both engines
emit identical DOM / `data-*` (drop-in).

**Breaking (visual — no API/DOM changes):**

- **Seven-shape morph.** The active indicator now continuously morphs through the
  M3 shape sequence — SoftBurst → Cookie9Sided → Pentagon → Pill → Sunny →
  Cookie4Sided → Oval — each shape held ~650ms (`MorphIntervalMillis`), layered
  under a steady global rotation (`GlobalRotationDurationMillis` ≈ 4666ms). This
  replaces the previous single flower path spun with a rotate + scale pulse. The
  shapes are sampled to a uniform point count and interpolated via the Web
  Animations API in the core factory (engine-agnostic), so both builds behave
  identically and the morph disables under `prefers-reduced-motion`.
- **Contained config colors fixed.** The contained variant is now a
  `primary-container` pill with an `on-primary-container` shape
  (`ContainedContainerColor` / `ContainedActiveColor`); it was wrongly
  `secondary-container` / `primary` in both engines.

Also adds a `prefers-reduced-motion` guard to the rotation (previously always ran).
