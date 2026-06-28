/**
 * progress.ts — tailwind-variants slots for the M3 Progress indicators.
 *
 * Linear: a 4dp `surface-container-highest` track with a `primary` active
 * indicator; the indeterminate slide animation keys off the Root's
 * `data-indeterminate` (see the `m3-linear-indeterminate` keyframe in
 * preset.css). Circular: a 48dp / 4dp `primary` ring whose arc is drawn by the
 * factory; `data-indeterminate` rotates the whole ring at 1.4s (matching the VE
 * build's spin period). Same DOM as the VE build.
 */
import { createProgress } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

export const linearTv = tv({
  slots: {
    root: 'group relative block w-full h-1 overflow-hidden rounded-full',
    track: 'absolute inset-0 bg-surface-container-highest rounded-full',
    indicator: [
      'absolute inset-y-0 left-0 bg-primary rounded-full',
      'transition-[width] duration-200 ease-standard',
      'group-data-[indeterminate]:w-2/5 group-data-[indeterminate]:transition-none',
      'group-data-[indeterminate]:animate-m3-linear-indeterminate',
    ],
  },
});

export const circularTv = tv({
  slots: {
    root: [
      'inline-flex items-center justify-center size-12',
      '[&_svg]:block [&_svg]:size-full',
      'data-[indeterminate]:animate-m3-circular-indeterminate',
    ],
    track: 'stroke-surface-container-highest [stroke-width:4px]',
    indicator: [
      'stroke-primary [stroke-width:4px] [stroke-linecap:round]',
      'transition-[stroke-dashoffset] duration-300 ease-standard',
    ],
  },
});

const l = linearTv();
const c = circularTv();
export const Progress = createProgress({
  linear: { root: l.root(), track: l.track(), indicator: l.indicator() },
  circular: { root: c.root(), track: c.track(), indicator: c.indicator() },
});
export type {
  LinearProgressProps,
  CircularProgressProps,
} from '@m3-baseui/core';
