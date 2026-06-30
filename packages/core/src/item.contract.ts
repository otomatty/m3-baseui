/**
 * item.contract.ts — slot classes + props for the M3 Item row primitive.
 *
 * `labs/item` is the layout primitive shared by List rows and Navigation
 * destinations: a leading slot, a text column (overline / headline / supporting)
 * and a trailing slot. It is purely presentational (a `<div>`); interactive
 * surfaces (List rows, navigation items) wrap their own element and reuse this
 * layout. One string per slot keeps both engines drop-in compatible.
 */
import type * as React from 'react';

/**
 * Leading element shapes (M3): a 24dp `icon`, a 40dp circular `avatar`, a 56dp
 * `image`, or a 100×56dp `video` thumbnail. Surfaced as `data-leading` on the
 * leading slot so both engines size the column from one shared DOM contract.
 */
export const ITEM_LEADING_VARIANTS = ['icon', 'avatar', 'image', 'video'] as const;
export type ItemLeadingVariant = (typeof ITEM_LEADING_VARIANTS)[number];

export interface ItemClasses {
  /** The row container. */
  root: string;
  /** Leading icon/avatar slot. */
  leading: string;
  /** Text column (overline + headline + supporting). */
  content: string;
  /** Small label above the headline. */
  overline: string;
  /** Primary line. */
  headline: string;
  /** Secondary line below the headline. */
  supporting: string;
  /** Trailing icon/text slot. */
  trailing: string;
}

export interface ItemOwnProps {
  /** Leading element: 24dp icon, 40dp avatar, 56dp image or 100×56dp video thumbnail. */
  leading?: React.ReactNode;
  /**
   * Shape/size of the leading slot (`icon` by default). `icon` is decorative and
   * gets `aria-hidden`; `avatar`/`image`/`video` stay in the a11y tree.
   */
  leadingVariant?: ItemLeadingVariant;
  /** Trailing icon or supporting text slot. */
  trailing?: React.ReactNode;
  /** Small label rendered above the headline. */
  overline?: React.ReactNode;
  /** Secondary line rendered below the headline. */
  supporting?: React.ReactNode;
}

export type ItemProps = ItemOwnProps & React.HTMLAttributes<HTMLDivElement>;
