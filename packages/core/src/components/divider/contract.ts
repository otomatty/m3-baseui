/**
 * divider.contract.ts — inset/orientation sets and props for the M3 Divider.
 *
 * A 1dp `outline-variant` separator. Three insets (full / inset / middle) and
 * two orientations (horizontal / vertical); the class resolver turns that state
 * into one class string per engine. The element is `role="separator"`, so the
 * DOM + ARIA stay identical and the two builds remain drop-in compatible.
 */
import type * as React from 'react';

export const DIVIDER_INSETS = ['full', 'inset', 'middle'] as const;
export type DividerInset = (typeof DIVIDER_INSETS)[number];

export const DIVIDER_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type DividerOrientation = (typeof DIVIDER_ORIENTATIONS)[number];

export interface DividerResolverArgs {
  inset: DividerInset;
  orientation: DividerOrientation;
}

export type DividerClassResolver = (args: DividerResolverArgs) => string;

export interface DividerOwnProps {
  /**
   * Edge insets. `full` spans edge to edge; `inset` adds a 16dp leading inset
   * (e.g. aligning under list text); `middle` insets both ends 16dp.
   * @default 'full'
   */
  inset?: DividerInset;
  /** Divider axis. @default 'horizontal' */
  orientation?: DividerOrientation;
}

export type DividerProps = DividerOwnProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'role'>;
