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
  /** Disable the row (per-token dimming + `data-disabled`). */
  disabled?: boolean;
}

/** Fields every row variant shares, regardless of the element it renders to. */
type ListItemSharedProps = ListItemOwnProps & {
  children?: React.ReactNode;
  className?: string;
};

/**
 * Interactive linked row — rendered as an `<a>`. `interactive` + `href` accept
 * the native anchor attributes (`target`, `rel`, `download`, …).
 */
type ListItemLinkProps = ListItemSharedProps & {
  interactive: true;
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ListItemSharedProps | 'href'>;

/** Interactive button row — rendered as a `<button>`. */
type ListItemButtonProps = ListItemSharedProps & {
  interactive: true;
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ListItemSharedProps>;

/** Inert row — rendered as a `<div>` (no state layer). */
type ListItemInertProps = ListItemSharedProps & {
  interactive?: false;
  href?: undefined;
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ListItemSharedProps>;

/**
 * Props for a list row, discriminated on `interactive`/`href` so the attributes
 * match the element the factory renders: `<a>` for a linked interactive row,
 * `<button>` for a non-linked interactive row, `<div>` for an inert row.
 */
export type ListItemProps = ListItemLinkProps | ListItemButtonProps | ListItemInertProps;
