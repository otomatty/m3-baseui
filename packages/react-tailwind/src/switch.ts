/**
 * switch.ts — tailwind-variants slots for the M3 Switch.
 *
 * Track + handle styled off Base UI's data-checked/data-disabled state. The
 * thumb grows and slides when checked; a 40dp circular state layer (`before:`)
 * reacts to hover/focus/press on the root via the `group` utility.
 */
import { createSwitch } from '@otomatty/core';
import { tv } from 'tailwind-variants';

export const switchTv = tv({
  slots: {
    root: [
      'group relative inline-flex shrink-0 w-[52px] h-8 rounded-full border-2 box-border cursor-pointer',
      'bg-surface-container-highest border-outline',
      'transition-colors duration-200 ease-standard',
      'data-[checked]:bg-primary data-[checked]:border-primary',
      'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
      'data-[disabled]:pointer-events-none',
      // M3 disabled: faint track + outline (unselected); on-surface/12 track,
      // no outline (selected). Not a blanket element opacity.
      'data-[disabled]:bg-surface-container-highest/12 data-[disabled]:border-on-surface/12',
      'data-[disabled]:data-[checked]:bg-on-surface/12 data-[disabled]:data-[checked]:border-transparent',
    ],
    thumb: [
      'absolute top-1/2 -translate-y-1/2 left-[6px] size-4 rounded-full pointer-events-none',
      'flex items-center justify-center',
      'bg-outline text-on-surface',
      'transition-all duration-200 ease-standard',
      'data-[checked]:left-[22px] data-[checked]:size-6 data-[checked]:bg-on-primary data-[checked]:text-primary',
      // M3 with-icon: the unchecked handle grows to 24dp to fit its icon
      'data-[with-icon]:data-[unchecked]:left-1 data-[with-icon]:data-[unchecked]:size-6',
      // M3 handle interaction colors: unselected outline→on-surface-variant,
      // selected on-primary→primary-container on hover/focus/press
      'group-hover:bg-on-surface-variant group-focus-visible:bg-on-surface-variant group-active:bg-on-surface-variant',
      'group-hover:data-[checked]:bg-primary-container group-focus-visible:data-[checked]:bg-primary-container group-active:data-[checked]:bg-primary-container',
      // M3 squish: handle grows to 28px while pressed, staying on its side
      'group-active:left-0 group-active:size-7',
      'group-active:data-[checked]:left-5 group-active:data-[checked]:size-7',
      // M3 disabled handle: on-surface/38 (unselected), surface (selected)
      'group-data-[disabled]:bg-on-surface/38',
      'group-data-[disabled]:data-[checked]:bg-surface',
      // 40dp circular state layer centered on the thumb
      'before:content-[""] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
      'before:size-10 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-100',
      'group-hover:before:opacity-[var(--md-sys-state-hover)]',
      'group-focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'group-active:before:opacity-[var(--md-sys-state-pressed)]',
    ],
    // Handle icons (16dp). Both stay mounted; the root's data-checked reveals one.
    iconChecked: [
      'hidden group-data-[checked]:inline-flex items-center justify-center',
      'text-on-primary-container [&>svg]:size-4',
    ],
    iconUnchecked: [
      'inline-flex group-data-[checked]:hidden items-center justify-center',
      'text-surface-container-highest [&>svg]:size-4',
    ],
  },
});

const s = switchTv();
export const Switch = createSwitch({
  root: s.root(),
  thumb: s.thumb(),
  iconChecked: s.iconChecked(),
  iconUnchecked: s.iconUnchecked(),
});
