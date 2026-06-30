/**
 * progress.ts — tailwind-variants slots for the M3 Progress indicators.
 *
 * Linear: a 4dp `surface-container-highest` inactive track with a `primary`
 * active indicator. Per M3 the inactive track (`::before`) starts a 4dp gap past
 * the active tip — positioned from the factory's `--m3-progress` fraction — and a
 * `primary` track-stop dot (`::after`) sits at the far end. The indeterminate
 * slide animation keys off the Root's `data-indeterminate`, which also drops the
 * gap so the track stays full (see the `m3-linear-indeterminate` keyframe in
 * preset.css). Circular: a 48dp / 4dp `primary` ring whose arc is drawn by the
 * factory; `data-indeterminate` rotates the whole ring via Tailwind's built-in
 * `animate-spin` (1s) — the VE build matches that period. Same DOM as the VE build.
 */
import { createProgress } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

export const linearTv = tv({
  slots: {
    // The track-stop dot (4dp, primary) lives at the far end via `after:`.
    root: [
      'group relative block w-full h-1 overflow-hidden rounded-full',
      "after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2",
      'after:size-1 after:rounded-full after:bg-primary',
    ],
    // Positioning container only; the inactive track is the `before:` pseudo so a
    // 4dp gap separates it from the active indicator (`--m3-progress` + 4px).
    // Indeterminate has no fraction, so the inactive track spans the full width.
    track: [
      'absolute inset-0',
      "before:content-[''] before:absolute before:inset-y-0 before:right-0",
      'before:[left:calc(var(--m3-progress,0%)+4px)]',
      'before:bg-surface-container-highest before:rounded-full',
      'group-data-[indeterminate]:before:left-0',
    ],
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
      'data-[indeterminate]:animate-spin',
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
