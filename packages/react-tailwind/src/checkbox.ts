/**
 * checkbox.ts — tailwind-variants slots for the M3 Checkbox.
 *
 * 18dp box with a 40dp circular state layer. Checked/indeterminate fill the box
 * with primary; the indeterminate dash is an `::after` on the indicator and the
 * check SVG is hidden in that state via a group reference.
 */
import { createCheckbox } from '@m3/core';
import { tv } from 'tailwind-variants';

export const checkboxTv = tv({
  slots: {
    root: [
      'group relative inline-flex items-center justify-center shrink-0 box-border',
      'size-[18px] rounded-[2px] border-2 cursor-pointer bg-transparent',
      // Outline is on-surface-variant; the state layer (text/currentColor) is
      // on-surface unselected, primary when selected (material-web).
      'border-on-surface-variant text-on-surface',
      'transition-colors duration-150 ease-standard',
      'data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary',
      'data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary',
      'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
      'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0',
      // M3 disabled: unselected outline on-surface/38; selected/indeterminate
      // box on-surface/38 with no outline (the check turns surface, below).
      'data-[disabled]:border-on-surface/38',
      'data-[disabled]:data-[checked]:bg-on-surface/38 data-[disabled]:data-[checked]:border-transparent',
      'data-[disabled]:data-[indeterminate]:bg-on-surface/38 data-[disabled]:data-[indeterminate]:border-transparent',
      // 40dp circular state layer
      'before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
      'before:size-10 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
    ],
    indicator: [
      'group/cb relative inline-flex items-center justify-center size-full pointer-events-none text-on-primary',
      // M3 disabled: the check / dash turn the surface color on the faint box
      'group-data-[disabled]:text-surface',
      'opacity-0 data-[checked]:opacity-100 data-[indeterminate]:opacity-100',
      'data-[indeterminate]:after:content-[""] data-[indeterminate]:after:absolute',
      'data-[indeterminate]:after:w-[10px] data-[indeterminate]:after:h-[2px] data-[indeterminate]:after:rounded-full data-[indeterminate]:after:bg-current',
    ],
    icon: ['w-[18px] h-[18px] group-data-[indeterminate]/cb:opacity-0'],
  },
});

const c = checkboxTv();
export const Checkbox = createCheckbox({
  root: c.root(),
  indicator: c.indicator(),
  icon: c.icon(),
});
