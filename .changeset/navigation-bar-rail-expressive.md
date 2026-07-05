---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/core': major
---

NavigationBar and NavigationRail now follow the Material 3 Expressive spec (issue #114).

Aligned to Compose `NavigationBarTokens` / `NavigationBarVerticalItemTokens` /
`NavigationRailCollapsedTokens` / `NavigationRailColorTokens`. Both engines emit
identical DOM / `data-*` (drop-in).

**Breaking (visual — no API/DOM changes):**

- **Active label color `on-surface` → `secondary`** (bar + rail;
  `ItemActiveLabelTextColor = Secondary`) — the clearest Expressive change.
- **NavigationBar height 80dp → 64dp** (`NavigationBarTokens.ContainerHeight`)
  with symmetric item padding for the shorter bar.
- **NavigationBar active indicator 64×32 → 56×32** (`NavigationBarVerticalItemTokens`;
  the rail was already 56, only the bar was wrong).
- **NavigationRail collapsed width 80dp → 96dp**, top space 20 → 44dp, item gap
  12 → 4dp, item height fixed at 64dp (`NavigationRailCollapsedTokens`).
- The active label emphasis is now the `labelMediumEmphasized` typescale (weight
  700) instead of a raw `font-bold` (visually equivalent).
- The active-indicator **state layer is explicitly `on-secondary-container`**
  (was `currentColor`), matching `NavigationRailColorTokens` for active + inactive.

**Motion:**

- Indicator / icon / label color transitions now use the `spring-effects-default`
  easing (M3 `DefaultEffects`) instead of `ease-standard` 150ms.

Also: the Tailwind `tv` wrapper now teaches tailwind-merge the `…-emphasized`
typescale roles so an active `text-<color>` and `text-<role>-emphasized` no longer
collide.
