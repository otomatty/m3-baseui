---
'@m3-baseui/core': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/react-vanilla-extract': minor
---

Align the Progress indicators with the current Material 3 spec.

- **Circular**: default to the 40dp outer diameter (was 48dp) and add `size`
  (spec range 24–240dp) and `thickness` (4dp default, 8dp thick) props; draw the
  active arc and inactive track with a 4dp gap and rounded caps; replace the
  static spinning arc with the M3 "advance" motion (the ring rotates while the
  arc grows and shrinks).
- **Linear**: add a `thickness` prop (4dp default, 8dp thick) and replace the
  single sliding bar with M3's disjoint two-segment indeterminate motion.
- **Wavy (M3 Expressive)**: add a `wavy` prop and `amplitude` to both
  indicators for the determinate wavy active shape.
- Respect `prefers-reduced-motion` with static fallbacks in both engines.

Both engines keep emitting identical DOM and `data-*` state (drop-in parity).
