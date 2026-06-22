/**
 * list.contract.ts — slot classes + props for the M3 List.
 *
 * No Base UI primitive exists, so the factory emits semantic `ul` / `li` with
 * slot spans. An item can be one/two/three-line, carry leading/trailing slots,
 * be interactive (state layer + ripple, rendered as a `button`/`a`) or inert,
 * and disabled (per-token dimming via `data-disabled`). The `lines`/`interactive`
 * variants vary the item row, so the engine supplies the static `root` class plus
 * a resolver for the item slots; both builds share one DOM + `data-*` contract.
 */
import type * as React from 'react';

export const LIST_ITEM_LINES = [1, 2, 3] as const;
export type ListItemLines = (typeof LIST_ITEM_LINES)[number];

export interface ListItemResolverArgs {
  /** Line count: drives the row min-height and (3-line) top alignment. */
  lines: ListItemLines;
  /** Interactive rows get the state layer + pointer affordances. */
  interactive: boolean;
}

export interface ListItemSlotClasses {
  /** The styled row (the `li`'s inner button/anchor/div). */
  item: string;
  /** Leading icon/avatar slot. */
  leading: string;
  /** Headline + supporting text column. */
  content: string;
  /** Primary line. */
  headline: string;
  /** Supporting (secondary/tertiary) line. */
  supporting: string;
  /** Trailing icon/text slot. */
  trailing: string;
}

export interface ListClasses {
  /** The `ul` container. */
  root: string;
  /** Resolves the item slot classes for one row's `lines`/`interactive` state. */
  item: (args: ListItemResolverArgs) => ListItemSlotClasses;
}

export interface ListItemOwnProps {
  /** Leading icon (24dp) or avatar (40dp). */
  leading?: React.ReactNode;
  /** Trailing icon (24dp) or supporting text. */
  trailing?: React.ReactNode;
  /** Secondary line below the headline. Implies a two-line row unless overridden. */
  supportingText?: React.ReactNode;
  /** Force the line count (min-height). Defaults to 2 when `supportingText` is set, else 1. */
  lines?: ListItemLines;
  /** Render as an interactive row (state layer + ripple, `button`/`a`). */
  interactive?: boolean;
  /** Disable the row (per-token dimming + `data-disabled`). */
  disabled?: boolean;
  /** When set on an interactive row, render an `<a>` instead of a `<button>`. */
  href?: string;
}

export type ListItemProps = ListItemOwnProps &
  Omit<React.LiHTMLAttributes<HTMLLIElement>, 'children'> & {
    children?: React.ReactNode;
  };
