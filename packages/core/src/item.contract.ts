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
  /** Leading icon (24dp) or avatar slot. */
  leading?: React.ReactNode;
  /** Trailing icon or supporting text slot. */
  trailing?: React.ReactNode;
  /** Small label rendered above the headline. */
  overline?: React.ReactNode;
  /** Secondary line rendered below the headline. */
  supporting?: React.ReactNode;
}

export type ItemProps = ItemOwnProps & React.HTMLAttributes<HTMLDivElement>;
