/**
 * carousel.css.ts — vanilla-extract styles for the M3 Carousel.
 * Same DOM + `data-variant` hooks as the Tailwind build.
 */
import { globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = recipe({
  base: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    outline: 'none',
    selectors: {
      // Keyboard focus ring (M3: 3px secondary, 2px offset); keyboard-only.
      '&:focus-visible': {
        outline: `3px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
    },
    '@media': {
      // Reduced motion: jump instead of smooth-scrolling between snap cells.
      '(prefers-reduced-motion: reduce)': { scrollBehavior: 'auto' },
    },
  },
  variants: {
    variant: {
      'multi-browse': {},
      // Uniform, wider cells that scroll past the container edge.
      uncontained: {},
      hero: {},
      'full-screen': {
        // gap 0: full-screen slides fill the viewport with no inter-slide gap.
        gap: '0',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        height: '100%',
      },
    },
  },
  defaultVariants: { variant: 'multi-browse' },
});

export const item = recipe({
  base: {
    scrollSnapAlign: 'start',
    flexShrink: 0,
    overflow: 'hidden',
    // M3 Expressive: every sample masks items with shapes.extraLarge (28dp).
    borderRadius: vars.sys.shape.extraLarge,
  },
  variants: {
    variant: {
      'multi-browse': { width: '160px', height: '224px' },
      uncontained: { width: '224px', height: '224px' },
      hero: { width: '288px', height: '224px', scrollSnapAlign: 'center' },
      'full-screen': { width: '100%', height: '100%', scrollSnapAlign: 'center' },
    },
  },
  defaultVariants: { variant: 'multi-browse' },
});

// Hide the WebKit scrollbar. `aria-roledescription="carousel"` is unique to the
// carousel root, so scope the rule to it.
globalStyle('[aria-roledescription="carousel"]::-webkit-scrollbar', { display: 'none' });
