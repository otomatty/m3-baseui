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
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
    'disabled:opacity-[0.38] disabled:pointer-events-none',
    'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
  ],
  variants: {
    variant: {
      standard: 'text-on-surface-variant',
      filled: 'bg-primary text-on-primary',
      tonal: 'bg-secondary-container text-on-secondary-container',
      outlined: 'border border-outline text-on-surface-variant',
    },
    selected: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'standard', selected: true, class: 'text-primary' },
    { variant: 'filled', selected: false, class: 'bg-surface-container-highest text-primary' },
    { variant: 'tonal', selected: false, class: 'bg-surface-container-highest text-on-surface-variant' },
    { variant: 'outlined', selected: true, class: 'bg-inverse-surface text-inverse-on-surface border-transparent' },
  ],
  defaultVariants: {
    variant: 'standard',
  },
});

export const IconButton = createIconButton(({ variant, selected }) =>
  iconButton({ variant, selected }),
);
export type { IconButtonProps, IconButtonVariant } from '@m3/core';
