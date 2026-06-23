/**
 * card.ts — tailwind-variants slots for the M3 Card.
 *
 * 12dp corners. `elevated` is surface-container-low + level1, `filled` is
 * surface-container-highest (level0), `outlined` is surface + outline-variant.
 * Interactive cards add the `currentColor` state-layer `::before` (the pointer
 * ripple is added by the factory), a focus ring and per-token disabled dimming.
 * Same DOM + `data-*` as the VE build.
 */
import { createCard } from '@otomatty/core';
import { tv } from './tv';

export const cardTv = tv({
  base: 'relative box-border rounded-medium text-on-surface',
  variants: {
    variant: {
      elevated: 'bg-surface-container-low shadow-level1',
      filled: 'bg-surface-container-highest',
      outlined: 'bg-surface border border-outline-variant',
    },
    interactive: {
      true: [
        'group overflow-hidden cursor-pointer select-none text-left w-full outline-none',
        'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
        'hover:before:opacity-[var(--md-sys-state-hover)]',
        'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
        'active:before:opacity-[var(--md-sys-state-pressed)]',
        'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
        // M3 disabled: drop the shadow + state layer, dim the content per-token.
        'disabled:pointer-events-none disabled:before:opacity-0 disabled:shadow-none disabled:text-on-surface/38',
        'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0 data-[disabled]:shadow-none data-[disabled]:text-on-surface/38',
      ],
      false: '',
    },
  },
  compoundVariants: [
    // M3 interactive elevated: lifts to level2 on hover, settles to level1 on press.
    {
      variant: 'elevated',
      interactive: true,
      class: 'hover:shadow-level2 active:shadow-level1',
    },
  ],
  defaultVariants: {
    variant: 'elevated',
    interactive: false,
  },
});

export const Card = createCard({
  root: ({ variant, interactive }) => cardTv({ variant, interactive }),
});
export type { CardProps, CardVariant } from '@otomatty/core';
