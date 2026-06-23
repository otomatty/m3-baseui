/**
 * button.ts — tailwind-variants resolver wired into the shared factory.
 *
 * Emits the same DOM and `data-*` state as the vanilla-extract build; only the
 * class strings differ. Utilities such as `bg-primary`, `text-on-primary`,
 * `rounded-full`, `shadow-level1`, and `text-label-large` are produced by the
 * Tailwind v4 `@theme` preset shipped in `@otomatty/tokens/theme.css`.
 *
 * Opacity modifiers (`before:opacity-[var(--md-sys-state-hover)]`) drive the
 * state layer off the channel-triple colors.
 */
import { createButton } from '@otomatty/core';
import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'relative inline-flex items-center justify-center gap-2',
    'h-10 px-6 rounded-full overflow-hidden cursor-pointer select-none border-0',
    'text-label-large',
    // M3 with-icon padding: the icon side trims to 16dp (label side stays 24dp).
    'data-[with-start-icon]:pl-4 data-[with-end-icon]:pr-4',
    // Icon slot: 18dp, centered.
    '[&_[data-slot=button-icon]]:inline-flex [&_[data-slot=button-icon]]:items-center [&_[data-slot=button-icon]]:justify-center',
    '[&_[data-slot=button-icon]>svg]:size-[18px]',
    'transition-[box-shadow,background-color,color,border-color] duration-200 ease-[var(--md-sys-motion-easing-standard)]',
    // State layer overlay
    'before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:pointer-events-none',
    'before:transition-opacity before:duration-100',
    'hover:before:opacity-[var(--md-sys-state-hover)]',
    'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
    'active:before:opacity-[var(--md-sys-state-pressed)]',
    'data-[pressed]:before:opacity-[var(--md-sys-state-pressed)]',
    // Focus ring (M3: 3px secondary, 2px offset)
    'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
    // Disabled: no interaction, no state layer, no elevation. Per-variant
    // colors (container on-surface/12, label on-surface/38) live on each variant.
    'disabled:pointer-events-none disabled:shadow-none disabled:before:opacity-0',
    'data-[disabled]:pointer-events-none data-[disabled]:shadow-none data-[disabled]:before:opacity-0',
  ],
  variants: {
    // M3 elevation per variant: filled/tonal rest level0→hover level1→pressed level0;
    // elevated rest level1→hover level2→pressed level1. Disabled container is
    // on-surface/12 and label on-surface/38, matching material-web.
    variant: {
      filled: [
        'bg-primary text-on-primary',
        'hover:shadow-level1 focus-visible:shadow-none active:shadow-none data-[pressed]:shadow-none',
        'disabled:bg-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
      tonal: [
        'bg-secondary-container text-on-secondary-container',
        'hover:shadow-level1 focus-visible:shadow-none active:shadow-none data-[pressed]:shadow-none',
        'disabled:bg-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
      outlined: [
        'bg-transparent text-primary border border-outline',
        'disabled:text-on-surface/38 disabled:border-on-surface/12',
        'data-[disabled]:text-on-surface/38 data-[disabled]:border-on-surface/12',
      ],
      elevated: [
        'bg-surface-container-low text-primary shadow-level1',
        'hover:shadow-level2 focus-visible:shadow-level1 active:shadow-level1 data-[pressed]:shadow-level1',
        'disabled:bg-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
      text: [
        'bg-transparent text-primary px-3',
        'disabled:text-on-surface/38',
        'data-[disabled]:text-on-surface/38',
      ],
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export const Button = createButton(({ variant }) => button({ variant }));
export type { ButtonProps, ButtonVariant } from '@otomatty/core';
