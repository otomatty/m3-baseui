/**
 * chip.ts — wires the VE recipe into the shared factory.
 */
import { createChip } from '@m3-baseui/core';
import { chip, check, remove, avatar, icon } from './chip.css';

export const Chip = createChip(({ variant, elevated }) => ({
  root: chip({ variant, elevated }),
  remove,
  check,
  avatar,
  icon: icon({ variant }),
}));
export type { ChipProps, ChipVariant } from '@m3-baseui/core';
