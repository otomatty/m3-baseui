---
"@m3-baseui/react-tailwind": patch
"@m3-baseui/react-vanilla-extract": patch
---

Align TextField focus indicators with M3 / material-web. The focused active
indicator now grows to the M3 3dp width in both variants (filled
`focus-active-indicator-height: 3px`, outlined `focus-outline-width: 3px`)
instead of 2dp, matching the existing Select trigger. The outlined focus padding
compensates the extra 2px so content stays steady. Both engines keep identical
DOM and `data-*` (drop-in parity).
