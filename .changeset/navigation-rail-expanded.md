---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

NavigationRail gains the Material 3 Expressive expanded mode (issue #121).

Aligned to Compose `NavigationRailExpandedTokens` /
`NavigationRailHorizontalItemTokens` + `WideNavigationRail.kt`. Additive and
drop-in — both engines emit identical DOM / `data-*`.

**New props (on `NavigationRail.Root`):**

- `expanded`: widens the rail to 220–360dp (`ContainerWidthMinimum/Maximum`) and
  lays its items out horizontally — icon left, label right (`labelLarge`), with a
  56dp-tall active indicator, 16dp leading space and 8dp icon–label gap. The width
  animates with the default spatial spring.
- `modal`: renders the expanded rail as an elevated `surface-container` sheet
  (elevation Level2, 16dp corner). Implies `expanded`.

Both are surfaced via `data-expanded` / `data-modal` on the root, so the layout
switches purely in CSS without any DOM change. The collapsed vertical rail and the
existing `header` slot are unchanged.
