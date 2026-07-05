/**
 * progress.ts — tailwind-variants slots for the M3 Progress indicators.
 *
 * Linear: a `surface-container-highest` inactive track with a `primary` active
 * indicator (height from the factory's `thickness`). Per M3 the inactive track
 * (`::before`) starts a 4dp gap past the active tip — positioned from the
 * `--m3-progress` fraction — and a `primary` track-stop dot (`::after`) sits at
 * the far end. Indeterminate keys off the Root's `data-indeterminate`: it drops
 * the gap/dot and runs the M3 disjoint two-bar motion (`m3-linear-primary` +
 * `m3-linear-secondary` in preset.css). Circular: a 40dp / 4dp `primary` ring
 * (size/thickness configurable); `data-indeterminate` rotates the ring while the
 * arc grows/shrinks (advance). Same DOM as the VE build.
 */
import { createProgress } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

export const linearTv = tv({
  slots: {
    // The track-stop dot (primary, full track height) sits at the inline-end via
    // `after:`. It's a determinate-only M3 concept, so it's hidden while
    // indeterminate. Logical `end-0` mirrors with the indicator under `dir="rtl"`.
    // Height comes from the factory (inline) so `thickness` is honored.
    root: [
      'group relative block w-full overflow-hidden rounded-full',
      // The dot is `--m3-thickness` tall (stroke height) and centered, so it stays
      // correct when the wavy track grows taller than the stroke.
      "after:content-[''] after:absolute after:end-0 after:top-1/2 after:-translate-y-1/2",
      'after:h-[var(--m3-thickness,100%)] after:aspect-square after:rounded-full after:bg-primary',
      // Self variant (not `group-data-*`): the dot is on the root element itself,
      // which carries `data-indeterminate` — it isn't a descendant of `.group`.
      'data-[indeterminate]:after:hidden',
    ],
    // Positioning container only; the inactive track is the `before:` pseudo so a
    // 4dp gap separates it from the active indicator (`--m3-progress` + 4px). The
    // gap uses logical inline insets so it tracks the indicator (which Base UI
    // anchors at inline-start) under `dir="rtl"`. Indeterminate has no fraction,
    // so the inactive track spans the full width. The flat track stays
    // `--m3-thickness` tall and centered even when the wavy root is taller.
    track: [
      'absolute inset-0',
      "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:end-0",
      'before:h-[var(--m3-thickness,100%)]',
      'before:[inset-inline-start:calc(var(--m3-progress,0%)_+_4px)]',
      'before:bg-surface-container-highest before:rounded-full',
      'group-data-[indeterminate]:before:start-0',
    ],
    // Primary bar. Determinate: width from Base UI. Indeterminate: full width,
    // scaled + slid by the disjoint `primary` keyframe (origin at the start edge).
    // Wavy determinate: a scrolling sine tile masks the solid bar into a wave.
    indicator: [
      'absolute inset-y-0 left-0 origin-left bg-primary rounded-full',
      'transition-[width] duration-200 ease-standard',
      'group-data-[indeterminate]:w-full group-data-[indeterminate]:transition-none',
      'group-data-[indeterminate]:animate-m3-linear-primary',
      'group-data-[wavy]:rounded-none',
      'group-data-[wavy]:[-webkit-mask-image:var(--m3-wave)] group-data-[wavy]:[mask-image:var(--m3-wave)]',
      'group-data-[wavy]:[-webkit-mask-repeat:repeat-x] group-data-[wavy]:[mask-repeat:repeat-x]',
      'group-data-[wavy]:[-webkit-mask-size:40px_100%] group-data-[wavy]:[mask-size:40px_100%]',
      'group-data-[wavy]:animate-m3-wave-flow',
      // Reduced motion: freeze the loops and show a static ~40% bar / static wave.
      'motion-reduce:group-data-[indeterminate]:w-2/5',
      'motion-reduce:group-data-[indeterminate]:animate-none motion-reduce:group-data-[wavy]:animate-none',
    ],
    // Second disjoint bar: only present visually while indeterminate.
    indicatorSecondary: [
      'absolute inset-y-0 left-0 w-full origin-left bg-primary rounded-full hidden',
      'group-data-[indeterminate]:block group-data-[indeterminate]:animate-m3-linear-secondary',
      // Reduced motion: a single static bar reads better than two frozen ones.
      'motion-reduce:group-data-[indeterminate]:hidden',
    ],
  },
});

export const circularTv = tv({
  slots: {
    // Size comes from the factory (inline width/height) so `size` is honored.
    // Indeterminate rotates the whole ring; the arc grows/shrinks via the
    // indicator's own `dash` animation (M3 "advance").
    root: [
      'group inline-flex items-center justify-center',
      '[&_svg]:block [&_svg]:size-full',
      'data-[indeterminate]:animate-m3-circular-rotate',
      'motion-reduce:data-[indeterminate]:animate-none',
    ],
    // Both ends are rounded (M3); the inactive track sits behind with a 4dp gap.
    track: [
      'stroke-surface-container-highest [stroke-linecap:round]',
      'transition-[stroke-dasharray,stroke-dashoffset] duration-300 ease-standard',
    ],
    indicator: [
      'stroke-primary [stroke-linecap:round]',
      'transition-[stroke-dasharray,stroke-dashoffset] duration-300 ease-standard',
      'group-data-[indeterminate]:animate-m3-circular-dash group-data-[indeterminate]:transition-none',
      // Reduced motion: freeze the arc at its static 25% length (no rotation).
      'motion-reduce:group-data-[indeterminate]:animate-none',
    ],
  },
});

const l = linearTv();
const c = circularTv();
export const Progress = createProgress({
  linear: {
    root: l.root(),
    track: l.track(),
    indicator: l.indicator(),
    indicatorSecondary: l.indicatorSecondary(),
  },
  circular: { root: c.root(), track: c.track(), indicator: c.indicator() },
});
export type {
  LinearProgressProps,
  CircularProgressProps,
} from '@m3-baseui/core';
