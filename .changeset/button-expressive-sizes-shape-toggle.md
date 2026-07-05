---
'@m3-baseui/core': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/react-vanilla-extract': major
---

feat(button): M3 Expressive size system, shape morph, toggle, and color revisions

Bring Button up to M3 Expressive parity (Compose `Button{XSmall..XLarge}Tokens`
v0_11_0 + `Button.kt`). Both engines emit identical DOM/`data-*` (drop-in).

**New props**

- `size` (`xs` | `s` | `m` | `l` | `xl`, default `s`): heights 32/40/56/96/136dp,
  icons 20/20/24/32/40dp, symmetric horizontal padding 12/16/24/48/64dp,
  icon–label gap 4/8/8/12/16dp (XS is special-cased in Compose `Button.kt` to
  12dp/4dp; S–XL use their `Button{Size}Tokens` values), and size-linked typescale
  (XS·S labelLarge / M titleMedium / L headlineSmall / XL headlineLarge —
  Compose does **not** use the Emphasized companions).
- `shape` (`round` | `square`, default `round`): square corners are
  XS·S 12 / M 16 / L·XL 28 dp. The corner morphs smaller on press
  (`PressedContainerShape`: XS·S 8 / M 12 / L·XL 16 dp).
- `selected` (toggle): adds `aria-pressed` + `data-selected`, applies the
  Selected/Unselected color set (e.g. filled unselected =
  `surface-container` + `on-surface-variant`), and swaps to the opposite shape
  while selected.

**Breaking changes**

- Outlined/text label color moves from `primary` to `on-surface-variant`;
  the outlined border moves from `outline` to `outline-variant` (disabled too),
  with L 2dp / XL 3dp border widths.
- Disabled container opacity 0.12 → 0.1 and filled/elevated disabled label
  `on-surface` → `on-surface-variant` (@0.38). **tonal is unchanged** upstream
  (`FilledTonalButtonTokens` v0_103) and keeps 0.12 / `on-surface`.
- The S size gains a 20dp icon (was 18dp) and symmetric 16dp padding; the
  pre-Expressive asymmetric with-icon padding is removed.
- Motion now uses the `spring-effects-default` easing (critically damped, no
  bounce) per Compose `DefaultEffects`.
