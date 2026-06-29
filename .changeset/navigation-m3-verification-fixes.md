---
"@m3-baseui/react-tailwind": patch
"@m3-baseui/react-vanilla-extract": patch
---

Align the NavigationBar disabled state with the M3 spec and the per-token
disabled convention already used by Tabs and NavigationDrawer, keeping drop-in
parity between the Tailwind and vanilla-extract engines:

- **NavigationBar (disabled):** a disabled destination no longer fades the whole
  item with a blanket `opacity: 0.38`. Instead the icon and label dim to
  `on-surface` at 38% (per-token), the active-indicator state layer is
  suppressed, and the destination keeps `pointer-events: none`. A destination
  that is disabled *and* active stays dimmed (a combined `data-disabled` +
  `data-pressed` selector outranks the active color), matching how Tabs already
  handles disabled-active tabs.
- **NavigationBar (icon size):** the icon slot now constrains a raw `<svg>` to
  24dp, matching the NavigationDrawer and Tabs icon slots so drop-in `<svg>`
  icons render at the M3 size.

Both engines keep identical DOM and `data-*` (drop-in parity).
