---
"@m3-baseui/core": minor
"@m3-baseui/react-tailwind": minor
"@m3-baseui/react-vanilla-extract": minor
---

Carousel: keyboard scrolling + M3 four-layout parity (issue #78)

- The focusable scroller now advances one item at a time with the arrow keys
  along its scroll axis (←/→ horizontally, ↑/↓ for `full-screen`). Navigation
  lives in `@m3-baseui/core`, so both engines share the behavior, DOM, and
  `data-*` contract. A caller `onKeyDown` still runs and can opt out via
  `preventDefault()`.
- Added a keyboard-only focus ring (3px secondary, WCAG 2.4.7) and
  `prefers-reduced-motion` handling for the scroll animation in both engines.
- Added the missing M3 `uncontained` layout, completing the four variants
  (`multi-browse` / `uncontained` / `hero` / `full-screen`).
