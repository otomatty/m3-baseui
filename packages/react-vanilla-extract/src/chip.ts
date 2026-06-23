/**
 * chip.ts — wires the VE recipe into the shared factory.
 */
import { createChip } from '@otomatty/core';
import { chip, check, remove, avatar } from './chip.css';

export const Chip = createChip(({ variant, elevated }) => ({
  root: chip({ variant, elevated }),
  remove,
  check,
  avatar,
}));
export type { ChipProps, ChipVariant } from '@otomatty/core';
