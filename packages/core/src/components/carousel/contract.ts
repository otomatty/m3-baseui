/**
 * carousel.contract.ts — variant set + slot classes for the M3 Carousel.
 *
 * `components/carousel`: a horizontally (or, for `full-screen`, vertically)
 * scrollable strip of items with CSS scroll-snap. Three layouts — `multi-browse`
 * (large + medium + small items), `hero` (one prominent item with a peek), and
 * `full-screen` (one full item per view, vertical). The variant lives on
 * `Carousel.Root` and styles both the scroller and its items, so the resolver
 * returns the full slot map per variant and the factory propagates it to the
 * items via context (mirrors Tabs). Both engines emit the same DOM + `data-*`.
 */
export const CAROUSEL_VARIANTS = ['multi-browse', 'hero', 'full-screen'] as const;
export type CarouselVariant = (typeof CAROUSEL_VARIANTS)[number];

export interface CarouselSlotClasses {
  root: string;
  item: string;
}

export type CarouselClassResolver = (variant: CarouselVariant) => CarouselSlotClasses;
