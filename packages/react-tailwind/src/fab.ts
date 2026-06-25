/**
 * fab.ts — tailwind-variants for the M3 FAB.
 *
 * Four sizes + four container colors, elevation level3 (level4 on hover) and a
 * currentColor state-layer `::before`. The pointer ripple is added by the
 * factory. Same DOM as the VE build.
 */
import { createFab } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

export const fabTv = tv({
  base: [
    'relative inline-flex items-center justify-center box-border overflow-hidden',
    'border-0 cursor-pointer select-none outline-none',
    'shadow-level3 hover:shadow-level4',
    'transition-shadow duration-150 ease-standard',
    'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
    'hover:before:opacity-[var(--md-sys-state-hover)]',
    'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
    'active:before:opacity-[var(--md-sys-state-pressed)]',
    'data-[pressed]:before:opacity-[var(--md-sys-state-pressed)]',
    'disabled:opacity-[0.38] disabled:pointer-events-none disabled:shadow-none',
    'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none data-[disabled]:shadow-none',
  ],
  variants: {
    size: {
      small: 'size-10 rounded-medium [&_svg]:size-6',
      regular: 'size-14 rounded-large [&_svg]:size-6',
      large: 'size-24 rounded-extra-large [&_svg]:size-9',
      extended: 'h-14 min-w-20 px-4 gap-3 rounded-large text-label-large [&_svg]:size-6',
    },
    color: {
      surface: 'bg-surface-container-high text-primary',
      primary: 'bg-primary-container text-on-primary-container',
      secondary: 'bg-secondary-container text-on-secondary-container',
      tertiary: 'bg-tertiary-container text-on-tertiary-container',
    },
  },
  defaultVariants: {
    size: 'regular',
    color: 'surface',
  },
});

export const Fab = createFab(({ size, color }) => fabTv({ size, color }));
export type { FabProps, FabSize, FabColor } from '@m3-baseui/core';
