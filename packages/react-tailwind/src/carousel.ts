/**
 * carousel.ts — tailwind-variants slots for the M3 Carousel.
 *
 * Root is a scroll-snap scroller (hidden scrollbar); items are snap-aligned,
 * `large`-radius cells. `multi-browse` and `hero` scroll horizontally (hero
 * items are wider and centre-snap); `full-screen` stacks full-size items
 * vertically. Same DOM as the VE build.
 */
import { createCarousel } from '@m3-baseui/core';
import { tv } from './tv';

export const carouselTv = tv({
  slots: {
    root: [
      'flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth',
      '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    ],
    item: 'snap-start shrink-0 overflow-hidden rounded-large',
  },
  variants: {
    variant: {
      'multi-browse': { item: 'w-40 h-56' },
      hero: { item: 'w-72 h-56 snap-center' },
      'full-screen': {
        // gap-0: full-screen slides fill the viewport with no inter-slide gap.
        root: 'flex-col gap-0 overflow-x-hidden overflow-y-auto snap-y h-full',
        item: 'w-full h-full snap-center',
      },
    },
  },
  defaultVariants: { variant: 'multi-browse' },
});

export const Carousel = createCarousel((variant) => {
  const s = carouselTv({ variant });
  return { root: s.root(), item: s.item() };
});
export type { CarouselVariant } from '@m3-baseui/core';
