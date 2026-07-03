/**
 * toolbar.contract.ts — variant/orientation set + props for the M3 Expressive
 * Toolbar.
 *
 * `components/toolbars`: a floating pill that groups related actions (icon
 * buttons, and optionally a leading/trailing emphasized button). Two color
 * configs — `standard` (surface-container) and `vibrant` (primary-container) —
 * and two orientations (`horizontal` / `vertical`). Rendered as a
 * `role="toolbar"` container; presentational only (the actions are supplied by
 * the consumer). The resolver returns one class string per (variant,
 * orientation) so both engines stay drop-in compatible.
 */
import type * as React from 'react';

export const TOOLBAR_VARIANTS = ['standard', 'vibrant'] as const;
export type ToolbarVariant = (typeof TOOLBAR_VARIANTS)[number];

export const TOOLBAR_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type ToolbarOrientation = (typeof TOOLBAR_ORIENTATIONS)[number];

export interface ToolbarResolverArgs {
  variant: ToolbarVariant;
  orientation: ToolbarOrientation;
}

export type ToolbarClassResolver = (args: ToolbarResolverArgs) => string;

export interface ToolbarOwnProps {
  /** M3 color config. @default 'standard' */
  variant?: ToolbarVariant;
  /** Layout axis. @default 'horizontal' */
  orientation?: ToolbarOrientation;
}

export type ToolbarProps = ToolbarOwnProps & React.HTMLAttributes<HTMLDivElement>;
