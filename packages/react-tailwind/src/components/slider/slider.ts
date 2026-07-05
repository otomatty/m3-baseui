/**
 * slider.ts — Tailwind classes for the M3 Expressive Slider.
 *
 * 16dp track with a 4×44dp bar handle (`CornerFull`). The active fill (indicator)
 * is `primary`; the inactive rail is drawn on the track's `::before`/`::after`
 * pseudos (`secondary-container`) so the 6dp handle gaps stay transparent. The
 * factory positions the active fill and publishes the active-region fraction as
 * `--m3-slider-start/end` (+ `data-range` on the root) so the pseudos can offset
 * by the 8px gap (6dp gap + half the 4dp handle) and keep a 2dp inside corner.
 *
 * The handle drops the old state layer: it shrinks 4→2dp on pressed/focus (hover
 * stays 4dp) via the fast-spatial spring. Disabled follows M3 per-token
 * opacities: inactive rail on-surface/0.12, active fill + handle on-surface/0.38,
 * stop dots on-surface. The root carries a `group` so descendants can react to
 * Base UI's data-disabled / data-range on Root.
 */
import { createSlider } from '@m3-baseui/core';
import { tv } from '../../tv';

export const sliderTv = tv({
  slots: {
    root: 'group relative flex items-center select-none w-full touch-none',
    control: 'relative flex items-center w-full h-11',
    // Transparent positioning container; the inactive rail lives on the pseudos.
    // `::before` = the rail after the active end (single + range). `::after` =
    // the rail before the active start (range only; it collapses when
    // `--m3-slider-start` is 0). Both offset by the 8px handle gap and keep a 2dp
    // inside corner / full outside corner. Logical inline insets track RTL.
    track: [
      'relative w-full h-4',
      "before:content-[''] before:absolute before:top-0 before:bottom-0 before:end-0",
      'before:[inset-inline-start:calc(var(--m3-slider-end)_+_8px)]',
      'before:bg-secondary-container before:rounded-s-[2px] before:rounded-e-full',
      'group-data-[disabled]:before:bg-on-surface/[0.12]',
      "after:content-[''] after:absolute after:top-0 after:bottom-0 after:start-0",
      'after:[inset-inline-end:calc(100%_-_var(--m3-slider-start)_+_8px)]',
      'after:bg-secondary-container after:rounded-s-full after:rounded-e-[2px]',
      'group-data-[disabled]:after:bg-on-surface/[0.12]',
    ],
    // Active fill. Geometry (absolute insets built from the active fraction + 8px
    // gap) is set inline by the factory; here we own colour + corners. Outer edge
    // full, inner (handle-facing) edge 2dp; a range slider's start edge is inner
    // too (`data-range`).
    indicator: [
      'bg-primary rounded-s-full rounded-e-[2px]',
      'group-data-[range]:rounded-s-[2px]',
      'group-data-[disabled]:bg-on-surface/[0.38]',
    ],
    // 4×44dp bar handle, CornerFull. No state layer: it shrinks to 2dp on
    // pressed (data-dragging) / focus via the fast-spatial spring; hover stays
    // 4dp. Disabled keeps the 4dp width (DisabledHandleWidth) and dims to 0.38.
    thumb: [
      'w-1 h-11 rounded-full bg-primary outline-none',
      'transition-[width] ease-spring-spatial-fast duration-[var(--md-sys-motion-duration-spring-spatial-fast)]',
      'focus-visible:w-0.5 data-[dragging]:w-0.5',
      'group-data-[disabled]:bg-on-surface/[0.38]',
    ],
    value: 'text-label-large text-on-surface-variant tabular-nums',
    tickList: 'pointer-events-none absolute inset-0',
    // Stop dots reverse across the tracks: primary on the inactive rail,
    // secondary-container on the active fill; disabled dots are on-surface.
    tick: [
      'absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary',
      'data-[active]:bg-secondary-container',
      'group-data-[disabled]:bg-on-surface',
    ],
    // Floating value indicator: inverse-surface container / inverse-on-surface
    // text, 12dp above the handle.
    valueLabel: [
      'pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5',
      'bg-inverse-surface text-label-large text-inverse-on-surface tabular-nums opacity-0',
      'data-[visible]:opacity-100',
    ],
  },
});

const s = sliderTv();
export const Slider = createSlider({
  root: s.root(),
  control: s.control(),
  track: s.track(),
  indicator: s.indicator(),
  thumb: s.thumb(),
  value: s.value(),
  tickList: s.tickList(),
  tick: s.tick(),
  valueLabel: s.valueLabel(),
});
