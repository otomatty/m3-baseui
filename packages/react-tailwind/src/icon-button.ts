/**
 * icon-button.ts — tailwind-variants resolver for the M3 Icon Button.
 *
 * 40×40 circular target with a centered icon. The `selected` variant supports
 * toggle icon buttons; when `selected` is undefined the variant's default
 * (filled/active) look is used. Emits the same DOM + ripple as the VE build.
 */
import { createIconButton } from '@m3/core';
import { tv } from 'tailwind-variants';

export const iconButton = tv({
  base: [
    'relative inline-flex items-center justify-center shrink-0',
    'size-10 rounded-full overflow-hidden cursor-pointer select-none border-0 bg-transparent p-2',
    'transition-[box-shadow,background-color,color] duration-200 ease-standard',
    // State layer overlay
    'before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:pointer-events-none',
    'before:transition-opacity before:duration-100',
    'hover:before:opacity-[var(--md-sys-state-hover)]',
    'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
    'active:before:opacity-[var(--md-sys-state-pressed)]',
    'data-[pressed]:before:opacity-[var(--md-sys-state-pressed)]',
    // Focus ring (M3: 3px secondary, 2px offset)
    'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
    // Disabled: no interaction, no state layer. Per-variant disabled colors
    // (container on-surface/12, icon on-surface/38) live on each variant.
    'disabled:pointer-events-none disabled:before:opacity-0',
    'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0',
  ],
  variants: {
    // Disabled icon is on-surface/38 for every variant; filled/tonal disabled
    // container is on-surface/12; outlined disabled outline is on-surface/12
    // (material-web parity).
    variant: {
      standard: [
        'text-on-surface-variant',
        'disabled:text-on-surface/38 data-[disabled]:text-on-surface/38',
      ],
      filled: [
        'bg-primary text-on-primary',
        'disabled:bg-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
      tonal: [
        'bg-secondary-container text-on-secondary-container',
        'disabled:bg-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
      outlined: [
        'border border-outline text-on-surface-variant',
        'disabled:border-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:border-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
    },
    selected: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'standard', selected: true, class: 'text-primary' },
    { variant: 'filled', selected: false, class: 'bg-surface-container-highest text-primary' },
    {
      variant: 'tonal',
      selected: false,
      class: 'bg-surface-container-highest text-on-surface-variant',
    },
    {
      variant: 'outlined',
      selected: true,
      class: [
        'bg-inverse-surface text-inverse-on-surface border-transparent',
        // M3 disabled + selected: faint on-surface/12 container, no outline
        // (icon falls back to on-surface/38 from the variant). NOT transparent.
        'disabled:bg-on-surface/12 disabled:border-transparent',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:border-transparent',
      ],
    },
  ],
  defaultVariants: {
    variant: 'standard',
  },
});

export const IconButton = createIconButton(({ variant, selected }) =>
  iconButton({ variant, selected }),
);
export type { IconButtonProps, IconButtonVariant } from '@m3/core';
