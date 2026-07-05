---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
---

Carousel items now use the Material 3 Expressive `extra-large` (28dp) corner
(issue #116).

Aligned to Compose `carousel/Carousel.kt` + samples, where every layout masks
items with `MaterialTheme.shapes.extraLarge` (28dp). Previously items used
`large` (16dp). Both engines emit identical DOM / `data-*` (drop-in).

**Breaking (visual — no API/DOM changes):** item corner radius 16dp → 28dp.

Note: M3's dynamic keylines (multi-browse large+medium+small, hero side peeks)
and the scroll-driven mask/parallax with a spring snap depend on a
scroll-position→size mapping that CSS scroll-snap cannot express. The static item
sizes approximate the layout (multi-browse/hero already show a trailing/adjacent
peek via snap alignment); the dynamic keyline and mask transition are documented
as a future enhancement (a JS scroll driver using `spring-spatial-default`).
