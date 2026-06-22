/**
 * switch.ts — tailwind-variants slots for the M3 Switch.
 *
 * Track + handle styled off Base UI's data-checked/data-disabled state. The
 * thumb grows and slides when checked; a 40dp circular state layer (`before:`)
 * reacts to hover/focus/press on the root via the `group` utility.
 */
import { createSwitch } from '@m3/core';
import { tv } from 'tailwind-variants';

export const switchTv = tv({
  slots: {
    root: [
      'group relative inline-flex shrink-0 w-[52px] h-8 rounded-full border-2 box-border cursor-pointer',
      'bg-surface-container-highest border-outline',
      'transition-colors duration-200 ease-standard',
      'data-[checked]:bg-primary data-[checked]:border-primary',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
    ],
    thumb: [
      'absolute top-1/2 -translate-y-1/2 left-[6px] size-4 rounded-full pointer-events-none',
      'bg-outline text-on-surface',
      'transition-all duration-200 ease-standard',
      'data-[checked]:left-[22px] data-[checked]:size-6 data-[checked]:bg-on-primary data-[checked]:text-primary',
      // 40dp circular state layer centered on the thumb
      'before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
      'before:size-10 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-100',
      'group-hover:before:opacity-[var(--md-sys-state-hover)]',
      'group-focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'group-active:before:opacity-[var(--md-sys-state-pressed)]',
    ],
  },
});

const s = switchTv();
export const Switch = createSwitch({ root: s.root(), thumb: s.thumb() });
