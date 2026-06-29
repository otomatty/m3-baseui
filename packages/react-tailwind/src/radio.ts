/**
 * radio.ts — tailwind-variants slots for the M3 Radio + RadioGroup.
 *
 * 20dp circle with a 40dp circular state layer; checked shows a 10dp primary dot
 * (the indicator) and recolors the ring. RadioGroup lays radios out in a column.
 */
import { createRadio, createRadioGroup } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

export const radioTv = tv({
  slots: {
    root: [
      'group relative inline-flex items-center justify-center shrink-0 box-border',
      'size-5 rounded-full border-2 cursor-pointer bg-transparent',
      // Ring is on-surface-variant; the state layer (text/currentColor) is
      // on-surface unselected, primary when selected (material-web).
      'border-on-surface-variant text-on-surface',
      'transition-colors duration-150 ease-standard',
      'data-[checked]:border-primary data-[checked]:text-primary',
      // M3 pressed state layer inverts: unselected→primary, selected→on-surface
      'active:text-primary',
      'data-[checked]:active:text-on-surface',
      // M3 error: error ring + error state layer in every interaction state
      'data-[error]:border-error data-[error]:text-error data-[error]:active:text-error',
      'data-[error]:data-[checked]:border-error data-[error]:data-[checked]:text-error data-[error]:data-[checked]:active:text-error',
      'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
      // M3 disabled: ring (and dot) turn on-surface/38; no state layer.
      'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0',
      'data-[disabled]:border-on-surface/38',
      'before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
      'before:size-10 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
    ],
    indicator: [
      'block rounded-full bg-primary pointer-events-none origin-center',
      // M3 inner-circle-grow: the 10dp dot scales from center with
      // emphasized-decelerate over 300ms (token-backed), not width/height from 0.
      // Tailwind v4's `scale-*` sets the standalone `scale` property (not
      // `transform`), so the transition must name `scale` to animate the grow.
      'size-2.5 scale-0 opacity-0',
      'transition-[scale,opacity] ease-emphasized-decelerate duration-[var(--md-sys-motion-duration-medium2)]',
      'data-[checked]:scale-100 data-[checked]:opacity-100',
      'group-data-[error]:bg-error',
      'group-data-[disabled]:bg-on-surface/38',
    ],
  },
});

const r = radioTv();
export const Radio = createRadio({ root: r.root(), indicator: r.indicator() });

export const RadioGroup = createRadioGroup('inline-flex flex-col gap-1');
