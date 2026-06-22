/**
 * button.ts — tailwind-variants resolver wired into the shared factory.
 *
 * Emits the same DOM and `data-*` state as the vanilla-extract build; only the
 * class strings differ. Utilities such as `bg-primary`, `text-on-primary`,
 * `rounded-full`, `shadow-level1`, and `text-label-large` are produced by the
 * Tailwind v4 `@theme` preset shipped in `@m3/tokens/theme.css`.
 *
 * Opacity modifiers (`before:opacity-[var(--md-sys-state-hover)]`) drive the
 * state layer off the channel-triple colors.
 */
import { createButton } from '@m3/core';
import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'relative inline-flex items-center justify-center gap-2',
    'h-10 px-6 rounded-full overflow-hidden cursor-pointer select-none border-0',
    'text-label-large',
    'transition-[box-shadow,background-color] duration-200 ease-[var(--md-sys-motion-easing-standard)]',
    // State layer overlay
    'before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:pointer-events-none',
    'before:transition-opacity before:duration-100',
    'hover:before:opacity-[var(--md-sys-state-hover)]',
    'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
    'active:before:opacity-[var(--md-sys-state-pressed)]',
    'data-[pressed]:before:opacity-[var(--md-sys-state-pressed)]',
    // Focus ring
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
    // Disabled
    'disabled:opacity-[0.38] disabled:pointer-events-none disabled:shadow-none',
    'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none data-[disabled]:shadow-none',
  ],
  variants: {
    variant: {
      filled: 'bg-primary text-on-primary',
      tonal: 'bg-secondary-container text-on-secondary-container',
      outlined: 'bg-transparent text-primary border border-outline',
      elevated: 'bg-surface-container-low text-primary shadow-level1',
      text: 'bg-transparent text-primary px-3',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export const Button = createButton(({ variant }) => button({ variant }));
export type { ButtonProps, ButtonVariant } from '@m3/core';
