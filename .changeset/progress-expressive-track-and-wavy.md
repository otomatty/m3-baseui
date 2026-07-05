---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/core': major
---

Progress (Linear + Circular) now follows the Material 3 Expressive spec (issue #117).

Aligned to Compose `ProgressIndicatorTokens` / `LinearProgressIndicatorTokens` /
`CircularProgressIndicatorTokens`. Both engines emit identical DOM / `data-*` (drop-in).

**Breaking (visual — no API/DOM changes):**

- **Inactive track color `surface-container-highest` → `secondary-container`**
  (`ProgressIndicatorTokens.TrackColor`), linear + circular.
- **Wavy now applies to indeterminate too** (was determinate-only). Setting
  `wavy` on an indeterminate indicator renders the Expressive wave:
  - Linear: a full-width flowing wave at the 20dp
    `IndeterminateActiveWaveWavelength` (the disjoint two-bar motion is retained
    as the non-wavy default).
  - Circular: a single sine-modulated arc spun by the ring rotation.
- **Circular wavy refinements:** amplitude 2 → **1.6dp** (`ActiveWaveAmplitude`),
  wavelength ~12 → **15dp** (`ActiveWaveWavelength`), and the wavy ring's outer box
  grows to **48dp** (`WaveSize`) while the 40dp ring stays put.

**Motion:** determinate value transitions now use the `spring-effects-default`
easing instead of `ease-standard`.
