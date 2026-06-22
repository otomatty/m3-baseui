/**
 * chip.ts — tailwind-variants slots for the M3 Chip.
 *
 * 32dp tall, 8dp corners, label-large. The state layer reacts to hover/focus/
 * press (not the persistent toggle `data-pressed`, which a filter chip uses for
 * its selected fill). Emits the same DOM + ripple as the VE build.
 */
import { createChip } from '@m3/core';
import { tv } from 'tailwind-variants';

export const chipTv = tv({
  slots: {
    root: [
      'relative inline-flex items-center justify-center gap-2 box-border',
      'h-8 px-4 rounded-[8px] overflow-hidden select-none border bg-transparent text-label-large',
      'transition-colors duration-150 ease-standard',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
      'disabled:opacity-[0.38] disabled:pointer-events-none',
    ],
    remove: [
      'inline-flex items-center justify-center shrink-0 size-[18px] -mr-1 ml-1 rounded-full border-0 bg-transparent',
      'text-on-surface-variant cursor-pointer hover:opacity-80',
    ],
  },
  variants: {
    variant: {
      assist: { root: 'border-outline text-on-surface cursor-pointer' },
      suggestion: { root: 'border-outline text-on-surface-variant cursor-pointer' },
      input: { root: 'border-outline text-on-surface-variant cursor-default pr-2' },
      filter: {
        root: [
          'border-outline text-on-surface-variant cursor-pointer',
          'data-[pressed]:bg-secondary-container data-[pressed]:text-on-secondary-container data-[pressed]:border-transparent',
        ],
      },
    },
  },
  defaultVariants: {
    variant: 'assist',
  },
});

export const Chip = createChip(({ variant }) => {
  const c = chipTv({ variant });
  return { root: c.root(), remove: c.remove() };
});
export type { ChipProps, ChipVariant } from '@m3/core';
