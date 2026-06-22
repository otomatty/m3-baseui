/**
 * chip.ts — wires the VE recipe into the shared factory.
 */
import { createChip } from '@m3/core';
import { chip, remove } from './chip.css';

export const Chip = createChip(({ variant, selected }) => ({
  root: chip({ variant, selected }),
  remove,
}));
export type { ChipProps, ChipVariant } from '@m3/core';
