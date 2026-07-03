/**
 * badge.contract.ts — slot classes + props for the M3 Badge.
 *
 * `labs/badge` has two sizes: a 6dp dot (no label) and a 16dp pill carrying a
 * number. The factory derives the size from whether a `value` is present and
 * exposes it as `data-size`; the engine resolves one class per size. Both builds
 * emit the same DOM + `data-*`, so they stay drop-in compatible.
 */
import type * as React from 'react';

export const BADGE_SIZES = ['small', 'large'] as const;
export type BadgeSize = (typeof BADGE_SIZES)[number];

export interface BadgeResolverArgs {
  /** `small` = 6dp dot, `large` = labelled 16dp pill. */
  size: BadgeSize;
}

export interface BadgeClasses {
  /** Resolves the root class for the derived size. */
  root: (args: BadgeResolverArgs) => string;
}

export interface BadgeOwnProps {
  /** Number/text to display. When present renders the large badge; otherwise a dot. */
  value?: React.ReactNode;
  /** Cap numeric values, rendering `max+` once exceeded (e.g. `99+`). */
  max?: number;
}

export type BadgeProps = BadgeOwnProps & Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>;
