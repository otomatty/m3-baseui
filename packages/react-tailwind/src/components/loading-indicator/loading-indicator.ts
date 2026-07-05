/**
 * loading-indicator.ts — tailwind-variants slots for the M3 Expressive Loading
 * indicator.
 *
 * A 48dp box holding the 7-shape morphing indicator. The shape morph runs via the
 * Web Animations API in the core factory; here the shape only carries the steady
 * global rotation (`m3-loading` keyframe in preset.css, ≈4666ms) about its own
 * centre. `contained` puts the shape (`on-primary-container`) on a
 * `primary-container` pill; uncontained draws the bare `primary` shape. Same DOM
 * as the VE build.
 */
import { createLoadingIndicator } from '@m3-baseui/core';
import { tv } from '../../tv';

export const loadingIndicatorTv = tv({
  slots: {
    // The SVG is a fixed 38dp active indicator. Uncontained: the box shrinks to
    // the shape. Contained: a 48dp pill wraps it (5dp inset on each side).
    root: 'inline-flex items-center justify-center [&_svg]:block [&_svg]:size-[38px]',
    indicator: [
      'fill-primary',
      // Steady rotation about the shape's own centre (transform-box: fill-box);
      // the shape morph is driven by the factory (WAAPI).
      '[transform-box:fill-box] origin-center animate-m3-loading',
      // Reduced motion: hold a static shape (the morph also self-disables).
      'motion-reduce:animate-none',
    ],
  },
  variants: {
    contained: {
      // M3 Expressive contained config: PrimaryContainer pill + OnPrimaryContainer shape.
      true: {
        root: 'size-12 rounded-full bg-primary-container',
        indicator: 'fill-on-primary-container',
      },
      false: {},
    },
  },
  defaultVariants: { contained: false },
});

export const LoadingIndicator = createLoadingIndicator(({ contained }) => {
  const s = loadingIndicatorTv({ contained });
  return { root: s.root(), indicator: s.indicator() };
});
export type { LoadingIndicatorProps } from '@m3-baseui/core';
