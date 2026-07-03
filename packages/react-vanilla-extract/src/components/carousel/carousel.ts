/**
 * carousel.ts — wires the VE styles into the shared Carousel parts factory.
 */
import { createCarousel } from '@m3-baseui/core';
import { root, item } from './carousel.css';

export const Carousel = createCarousel((variant) => ({
  root: root({ variant }),
  item: item({ variant }),
}));
export type { CarouselVariant } from '@m3-baseui/core';
