/**
 * fab.contract.ts — size/variant/color sets and props for the M3 (Expressive) FAB.
 *
 * Follows the Material 3 Expressive FAB spec:
 *   - Three sizes: small (56dp) / medium (80dp) / large (96dp). The pre-Expressive
 *     40dp FAB and the `surface` container color are removed (deprecated by M3).
 *   - Two variants: `standard` (square icon-only container) and `extended`
 *     (pill with a leading icon + label). The label typescale grows with the
 *     size (title-medium → title-large → headline-small).
 *   - Three container colors: primary / secondary / tertiary.
 *
 * The class resolver turns that state into one class string per engine; the DOM
 * + ripple stay identical so the two builds are drop-in compatible. Compose with
 * the Menu parts for a FAB menu (use the FAB as `Menu.Trigger render`).
 */
import type * as React from 'react';

export const FAB_SIZES = ['small', 'medium', 'large'] as const;
export type FabSize = (typeof FAB_SIZES)[number];

export const FAB_VARIANTS = ['standard', 'extended'] as const;
export type FabVariant = (typeof FAB_VARIANTS)[number];

export const FAB_COLORS = ['primary', 'secondary', 'tertiary'] as const;
export type FabColor = (typeof FAB_COLORS)[number];

export interface FabResolverArgs {
  size: FabSize;
  color: FabColor;
  variant: FabVariant;
}

export type FabClassResolver = (args: FabResolverArgs) => string;

export interface FabOwnProps {
  /** M3 FAB size (56 / 80 / 96 dp). @default 'small' */
  size?: FabSize;
  /** Standard (icon-only) or extended (icon + label pill). @default 'standard' */
  variant?: FabVariant;
  /** M3 FAB container color. @default 'primary' */
  color?: FabColor;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export type FabProps = FabOwnProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
