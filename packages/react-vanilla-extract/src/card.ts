/**
 * card.ts — wires the VE recipe into the shared Card factory.
 */
import { createCard } from '@otomatty/core';
import { card } from './card.css';

export const Card = createCard({
  root: ({ variant, interactive }) => card({ variant, interactive }),
});
export type { CardProps, CardVariant } from '@otomatty/core';
