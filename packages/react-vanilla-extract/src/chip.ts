/**
 * chip.ts — wires the VE recipe into the shared factory.
 */
import { createChip } from '@m3/core';
import { chip, check, remove } from './chip.css';

export const Chip = createChip(({ variant }) => ({
  root: chip({ variant }),
  remove,
  check,
}));
export type { ChipProps, ChipVariant } from '@m3/core';
