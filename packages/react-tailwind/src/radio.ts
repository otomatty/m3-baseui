/**
 * radio.ts — tailwind-variants slots for the M3 Radio + RadioGroup.
 *
 * 20dp circle with a 40dp circular state layer; checked shows a 10dp primary dot
 * (the indicator) and recolors the ring. RadioGroup lays radios out in a column.
 */
import { createRadio, createRadioGroup } from '@m3/core';
import { tv } from 'tailwind-variants';

export const radioTv = tv({
  slots: {
    root: [
      'relative inline-flex items-center justify-center shrink-0 box-border',
      'size-5 rounded-full border-2 cursor-pointer bg-transparent',
      'border-on-surface-variant text-on-surface-variant',
      'transition-colors duration-150 ease-standard',
      'data-[checked]:border-primary data-[checked]:text-primary',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
      'before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
      'before:size-10 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
    ],
    indicator: [
      'block rounded-full bg-primary pointer-events-none',
      'size-0 opacity-0 transition-all duration-150 ease-standard',
      'data-[checked]:size-2.5 data-[checked]:opacity-100',
    ],
  },
});

const r = radioTv();
export const Radio = createRadio({ root: r.root(), indicator: r.indicator() });

export const RadioGroup = createRadioGroup('inline-flex flex-col gap-1');
