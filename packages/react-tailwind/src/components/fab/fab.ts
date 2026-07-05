/**
 * fab.ts — tailwind-variants for the M3 (Expressive) FAB.
 *
 * Three sizes (small 56 / medium 80 / large 96 dp) × two variants (standard
 * icon-only square, extended icon + label pill) × three container colors
 * (primary / secondary / tertiary). Elevation level3 (level4 on hover) and a
 * currentColor state-layer `::before`. The size×variant geometry (container,
 * corner, icon, padding, label typescale) is resolved via compoundVariants so
 * every M3 combination maps to exact dp values. The pointer ripple is added by
 * the factory. Same DOM as the VE build.
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
    // M3 discourages disabled FABs (material-web removed the state). When native
    // disabled is used, apply the same container/label tokens as filled buttons.
    'disabled:pointer-events-none disabled:shadow-none disabled:before:opacity-0',
    'disabled:bg-on-surface/12 disabled:text-on-surface/38',
    'data-[disabled]:pointer-events-none data-[disabled]:shadow-none data-[disabled]:before:opacity-0',
    'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
  ],
  variants: {
    // Geometry is set by compoundVariants (size × variant); these keys exist so
    // the resolver can accept them.
    size: { small: '', medium: '', large: '' },
    variant: { standard: '', extended: '' },
    color: {
      primary: 'bg-primary-container text-on-primary-container',
      secondary: 'bg-secondary-container text-on-secondary-container',
      tertiary: 'bg-tertiary-container text-on-tertiary-container',
    },
  },
  compoundVariants: [
    // ---- Standard (icon-only square): container / corner / icon ----
    { size: 'small', variant: 'standard', class: 'size-14 rounded-large [&_svg]:size-6' }, // 56 / 16 / 24
    {
      size: 'medium',
      variant: 'standard',
      class: 'size-20 rounded-large-increased [&_svg]:size-7', // 80 / 20 / 28
    },
    { size: 'large', variant: 'standard', class: 'size-24 rounded-extra-large [&_svg]:size-8' }, // 96 / 28 / 32
    // ---- Extended (icon + label pill): height / corner / icon / padding / gap / label ----
    {
      size: 'small',
      variant: 'extended',
      class: 'h-14 px-4 gap-2 rounded-large text-title-medium [&_svg]:size-6', // 56 / 16 / 24 / 16 / 8
    },
    {
      size: 'medium',
      variant: 'extended',
      class: 'h-20 px-[26px] gap-4 rounded-large-increased text-title-large [&_svg]:size-7', // 80 / 20 / 28 / 26 / 16
    },
    {
      size: 'large',
      variant: 'extended',
      class: 'h-24 px-7 gap-5 rounded-extra-large text-headline-small [&_svg]:size-8', // 96 / 28 / 32 / 28 / 20
    },
  ],
  defaultVariants: {
    size: 'small',
    variant: 'standard',
    color: 'primary',
  },
});

export const Fab = createFab(({ size, color, variant }) => fabTv({ size, color, variant }));
export type { FabProps, FabSize, FabVariant, FabColor } from '@m3-baseui/core';
