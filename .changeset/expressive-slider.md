---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/core': major
---

Slider now follows the Material 3 Expressive spec (issue #111).

**Breaking (visual — no API/DOM changes):** the slider is a full visual swap from
the M3 2021 form to the Expressive shape system. Same components, props, and
`data-*` contract; refresh any visual-regression baselines.

- **16dp track** (was 4dp) and a **44dp control** height to hold the handle.
- **4×44dp bar handle** (`CornerFull`) replaces the 20dp circular thumb + 40dp
  state layer. The state layer is gone; the handle shrinks **4→2dp on
  pressed/focus** (hover stays 4dp) via the fast-spatial spring. Disabled keeps
  the 4dp width.
- **6dp track gap** on each side of the handle with a **2dp inside corner**. The
  active fill (indicator) and the inactive rail (drawn on the track pseudos) are
  offset by the gap; the factory publishes the active-region fraction as
  `--m3-slider-start` / `--m3-slider-end` and flags `data-range` on the root.
- **Inactive track → `secondary-container`** (was `surface-container-highest`).
- **Stop dots reverse**: `primary` on the inactive track, `secondary-container`
  on the active track, `on-surface` when disabled.
- **Value indicator → `inverse-surface` / `inverse-on-surface`** (was
  `primary` / `on-primary`) with a **12dp** bottom space (was 8dp).
- Drop-in fix: the handle's width transition now shares the fast-spatial spring
  easing across both engines (previously the Tailwind build left it unspecified
  while vanilla-extract used `easing.standard`).

Disabled per-token opacities are unchanged (inactive 0.12 / active + handle 0.38
on `on-surface`).
