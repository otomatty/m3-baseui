---
"@m3-baseui/react-tailwind": patch
"@m3-baseui/react-vanilla-extract": patch
---

Align Selection components with M3 / material-web: Slider now uses the dedicated
dragged state-layer opacity (0.16) while dragging instead of the pressed value
(0.10). Restore drop-in parity between engines — the vanilla-extract Checkbox now
transitions `color` (so the pressed state-layer inversion animates like the
Tailwind build) and the vanilla-extract Radio dot's opacity transition uses the
standard easing token.
