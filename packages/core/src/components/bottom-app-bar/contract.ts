/**
 * bottom-app-bar.contract.ts — slot classes + props for the M3 BottomAppBar.
 *
 * `components/bottom-app-bar`: an 80dp `surface-container` bar holding up to four
 * action icon buttons on the leading edge and an optional FAB on the trailing
 * edge. Rendered as a `role="toolbar"` container; presentational only (the FAB
 * and the actions are supplied by the consumer). One class string per slot keeps
 * both engines drop-in compatible.
 */
import type * as React from 'react';

export interface BottomAppBarClasses {
  /** `role="toolbar"` container. */
  root: string;
  /** Leading action-icon group. */
  actions: string;
  /** Trailing FAB slot. */
  fab: string;
}

export interface BottomAppBarOwnProps {
  /** Trailing floating action button. */
  fab?: React.ReactNode;
}

export type BottomAppBarProps = BottomAppBarOwnProps & React.HTMLAttributes<HTMLDivElement>;
