/**
 * fab.contract.ts — size/color sets and props for the M3 FAB.
 *
 * Four sizes (small / regular / large / extended) and four container colors
 * (primary / secondary / tertiary / surface). The class resolver turns that
 * state into one class string per engine; the DOM + ripple stay identical so
 * the two builds are drop-in compatible. Compose with the Menu parts for a
 * FAB menu (use the FAB as `Menu.Trigger render`).
 */
import type * as React from 'react';

export const FAB_SIZES = ['small', 'regular', 'large', 'extended'] as const;
export type FabSize = (typeof FAB_SIZES)[number];

export const FAB_COLORS = ['surface', 'primary', 'secondary', 'tertiary'] as const;
export type FabColor = (typeof FAB_COLORS)[number];

export interface FabResolverArgs {
  size: FabSize;
  color: FabColor;
}

export type FabClassResolver = (args: FabResolverArgs) => string;

export interface FabOwnProps {
  /** M3 FAB size. @default 'regular' */
  size?: FabSize;
  /** M3 FAB container color. @default 'surface' */
  color?: FabColor;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export type FabProps = FabOwnProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
