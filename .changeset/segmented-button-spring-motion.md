---
'@m3-baseui/react-vanilla-extract': patch
'@m3-baseui/react-tailwind': patch
---

SegmentedButton selection motion now uses the M3 Expressive springs (issue #122).

Compose drives the selection transition with the motion scheme (the
`OutlinedSegmentedButtonTokens` file carries no motion tokens). Matching that:
the selection color transition now rides the fast **effects** spring
(`spring-effects-fast`) and the checkmark's width — a spatial change (0→18dp) —
the fast **spatial** spring (`spring-spatial-fast`), both replacing the previous
`ease-standard` 150ms. Both engines emit identical values (drop-in); no DOM or
static-render change (visual baselines are unaffected).
