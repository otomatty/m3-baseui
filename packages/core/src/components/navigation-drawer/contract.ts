/**
 * navigation-drawer.contract.ts — slot classes + props for the M3 NavigationDrawer.
 *
 * `labs/navigationdrawer`: a `surface-container-low` panel of destinations.
 * `standard` sits inline; `modal` floats with elevation + rounded trailing edge.
 * Each destination is a full-corner pill row (active = `secondary-container`,
 * exposed via `data-selected` + `aria-current`). The factory keeps the open/close
 * + scrim machinery out (deferred to E2E per CLAUDE.md) and stays presentational.
 * One string per slot keeps both engines drop-in compatible.
 */
import type * as React from 'react';

export const NAV_DRAWER_VARIANTS = ['standard', 'modal'] as const;
export type NavigationDrawerVariant = (typeof NAV_DRAWER_VARIANTS)[number];

export interface NavigationDrawerResolverArgs {
  variant: NavigationDrawerVariant;
}

export interface NavigationDrawerClasses {
  /** Resolves the panel class for the variant. */
  root: (args: NavigationDrawerResolverArgs) => string;
  /** Section heading above a group of destinations. */
  headline: string;
  /** A destination row (the pill). */
  item: string;
  /** Leading icon slot. */
  leading: string;
  /** Destination label. */
  label: string;
  /** Trailing badge/text slot. */
  trailing: string;
}

export interface NavigationDrawerOwnProps {
  /** Layout style. @default 'standard' */
  variant?: NavigationDrawerVariant;
}

export interface NavigationDrawerItemOwnProps {
  /** Leading icon (24dp). */
  leading?: React.ReactNode;
  /** Trailing badge or supporting text. */
  trailing?: React.ReactNode;
  /** Active destination (secondary-container fill + `aria-current`). */
  selected?: boolean;
  /** Disable the destination (per-token dimming + `data-disabled`). */
  disabled?: boolean;
  /** Render the destination as a link. */
  href?: string;
}
