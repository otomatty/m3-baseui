/**
 * top-app-bar.contract.ts — variant set, slot classes + props for the M3 TopAppBar.
 *
 * `components/top-app-bar`: a `surface` bar holding a leading navigation icon, a
 * headline and trailing action icons. Four variants:
 *  - `small`  — 64dp, title-large, headline inline (left of the actions);
 *  - `center` — 64dp, title-large, headline centered;
 *  - `medium` — 112dp, headline-small on a second line below the action row;
 *  - `large`  — 152dp, headline-medium on a second line.
 * The layout differs by variant (one row vs. a row + a headline line), so the
 * resolver returns the full slot set for a given variant. One class string per
 * slot keeps both engines drop-in compatible.
 */
import type * as React from 'react';

export const TOP_APP_BAR_VARIANTS = ['small', 'center', 'medium', 'large'] as const;
export type TopAppBarVariant = (typeof TOP_APP_BAR_VARIANTS)[number];

export interface TopAppBarSlots {
  /** `<header>` container. */
  root: string;
  /** The action row (leading + headline/actions). */
  row: string;
  /** Leading navigation-icon slot. */
  leading: string;
  /** Headline (title) slot. */
  headline: string;
  /** Trailing action-icon slot. */
  trailing: string;
}

export interface TopAppBarResolverArgs {
  variant: TopAppBarVariant;
}

export type TopAppBarClassResolver = (args: TopAppBarResolverArgs) => TopAppBarSlots;

export interface TopAppBarOwnProps {
  /** Bar variant. @default 'small' */
  variant?: TopAppBarVariant;
  /** Leading navigation icon (e.g. a menu / back IconButton). */
  leading?: React.ReactNode;
  /** Trailing action icons. */
  trailing?: React.ReactNode;
}

export type TopAppBarProps = TopAppBarOwnProps & Omit<React.HTMLAttributes<HTMLElement>, 'title'>;
