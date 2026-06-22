/**
 * chip.contract.ts — variant set and props for the M3 Chip.
 *
 * Four M3 chip types. The `filter` chip is selectable (rendered as a Base UI
 * Toggle so it exposes `aria-pressed` + `data-pressed`); the `input` chip can
 * carry a trailing remove button. The class resolver returns one string per
 * slot so both engines stay drop-in compatible.
 */
import type * as React from 'react';

export const CHIP_VARIANTS = ['assist', 'filter', 'input', 'suggestion'] as const;
export type ChipVariant = (typeof CHIP_VARIANTS)[number];

export interface ChipResolverArgs {
  variant: ChipVariant;
  /** Selected state (filter chips). */
  selected: boolean | undefined;
}

export interface ChipSlotClasses {
  /** The chip body. */
  root: string;
  /** The trailing remove button (input chips). */
  remove: string;
}

export type ChipClassResolver = (args: ChipResolverArgs) => ChipSlotClasses;

export interface ChipOwnProps {
  /** M3 chip type. @default 'assist' */
  variant?: ChipVariant;
  /** Selected state for `filter` chips. */
  selected?: boolean;
  /** Selection change handler for `filter` chips. */
  onSelectedChange?: (selected: boolean) => void;
  /** When provided on an `input` chip, renders a trailing remove button. */
  onRemove?: () => void;
  /** Accessible label for the remove button. @default 'Remove' */
  removeLabel?: string;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export type ChipProps = ChipOwnProps &
  Omit<React.HTMLAttributes<HTMLElement>, 'color'>;
