/**
 * card.contract.ts — variant set + props for the M3 Card.
 *
 * Three M3 card styles (`elevated` / `filled` / `outlined`). A card can be
 * `interactive` — it then renders a `<button>` carrying the M3 state layer +
 * ripple and surfaces `data-disabled` for per-token dimming. The class resolver
 * returns one root string per variant/interactive state, so both engines stay
 * drop-in compatible.
 */
import type * as React from 'react';

export const CARD_VARIANTS = ['elevated', 'filled', 'outlined'] as const;
export type CardVariant = (typeof CARD_VARIANTS)[number];

export interface CardResolverArgs {
  variant: CardVariant;
  /** Interactive cards gain the state layer + pointer affordances. */
  interactive: boolean;
}

export interface CardClasses {
  /** Resolves the root class for the variant/interactive state. */
  root: (args: CardResolverArgs) => string;
}

export interface CardOwnProps {
  /** M3 card style. @default 'elevated' */
  variant?: CardVariant;
  /** Render an interactive card (`<button>` with state layer + ripple). */
  interactive?: boolean;
  /** Disable an interactive card (native `disabled` + `data-disabled`). */
  disabled?: boolean;
}

export type CardProps = CardOwnProps & Omit<React.HTMLAttributes<HTMLElement>, 'color'>;
