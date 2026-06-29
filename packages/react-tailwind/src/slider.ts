/**
 * slider.ts — Tailwind classes for the M3 Slider.
 *
 * 4dp rail (surface-container-highest) with a primary active indicator and a
 * 20dp primary thumb carrying a 40dp circular state layer (hover/focus/drag).
 *
 * Disabled follows M3 per-token opacities (not a blanket fade): inactive track
 * on-surface/0.12, active track + handle on-surface/0.38. The root carries a
 * `group` so the descendant parts can react to Base UI's data-disabled on Root.
 */
import { createSlider } from '@m3-baseui/core';
import { tv } from './tv';

export const sliderTv = tv({
  slots: {
    root: 'group relative flex items-center select-none w-full touch-none',
    control: 'relative flex items-center w-full h-10',
    track: [
      'relative w-full h-1 rounded-full bg-surface-container-highest',
      'group-data-[disabled]:bg-on-surface/[0.12]',
    ],
    indicator: [
      'absolute h-1 rounded-full bg-primary',
      'group-data-[disabled]:bg-on-surface/[0.38]',
    ],
    thumb: [
      'group/thumb relative size-5 rounded-full bg-primary outline-none',
      'before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
      'before:size-10 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'data-[dragging]:before:opacity-[var(--md-sys-state-dragged)]',
      'group-data-[disabled]:bg-on-surface/[0.38]',
    ],
    value: 'text-label-large text-on-surface-variant tabular-nums',
    tickList: 'pointer-events-none absolute inset-0',
    tick: [
      'absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-on-surface-variant',
      'data-[active]:bg-on-primary/[0.38]',
    ],
    valueLabel: [
      'pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5',
      'bg-primary text-label-large text-on-primary tabular-nums opacity-0',
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
