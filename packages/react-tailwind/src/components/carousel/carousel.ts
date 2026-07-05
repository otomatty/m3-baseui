/**
 * carousel.ts — tailwind-variants slots for the M3 Carousel.
 *
 * Root is a scroll-snap scroller (hidden scrollbar) that is keyboard-focusable:
 * a 3px secondary focus-visible ring makes that focus visible (WCAG 2.4.7), and
 * `motion-reduce:scroll-auto` drops the smooth snap animation under
 * `prefers-reduced-motion`. Items are snap-aligned, `large`-radius cells.
 * `multi-browse`, `uncontained`, and `hero` scroll horizontally (hero items are
 * wider and centre-snap; uncontained items are uniform and flow past the edge);
 * `full-screen` stacks full-size items vertically. Same DOM as the VE build.
 */
import { createCarousel } from '@m3-baseui/core';
import { tv } from '../../tv';

export const carouselTv = tv({
  slots: {
    root: [
      'flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth',
      '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      // Keyboard focus ring (M3: 3px secondary, 2px offset); keyboard-only.
      'outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
      // Reduced motion: jump instead of smooth-scrolling between snap cells.
      'motion-reduce:scroll-auto',
    ],
    item: 'snap-start shrink-0 overflow-hidden rounded-large',
  },
  variants: {
    variant: {
      'multi-browse': { item: 'w-40 h-56' },
      // Uniform, wider cells that scroll past the container edge.
      uncontained: { item: 'w-56 h-56' },
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
