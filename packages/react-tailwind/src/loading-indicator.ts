/**
 * loading-indicator.ts — tailwind-variants slots for the M3 Expressive Loading
 * indicator.
 *
 * A 48dp box holding the morphing `primary` shape; the rotate+scale morph keys
 * off the `m3-loading` keyframe (see preset.css) and always runs (indeterminate
 * only). `contained` puts the shape on a `secondary-container` pill. Same DOM as
 * the VE build.
 */
import { createLoadingIndicator } from '@m3-baseui/core';
import { tv } from './tv';

export const loadingIndicatorTv = tv({
  slots: {
    // The SVG is a fixed 38dp active indicator. Uncontained: the box shrinks to
    // the shape. Contained: a 48dp pill wraps it (5dp inset on each side).
    root: 'inline-flex items-center justify-center [&_svg]:block [&_svg]:size-[38px]',
    indicator: [
      'fill-primary',
      // Morph + rotate about the shape's own centre (transform-box: fill-box).
      '[transform-box:fill-box] origin-center animate-m3-loading',
    ],
  },
  variants: {
    contained: {
      true: { root: 'size-12 rounded-full bg-secondary-container' },
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
