/**
 * toolbar.contract.ts — variant/orientation set + props for the M3 Expressive
 * Toolbar.
 *
 * `components/toolbars`: a bar that groups related actions (icon buttons, and
 * optionally a leading/trailing emphasized button). The M3 Expressive toolbar has
 * two forms — `floating` (a rounded pill, no elevation) and `docked` (a full-width
 * `surface-container` bar with square corners) — two color configs, `standard`
 * (surface-container) and `vibrant` (primary-container), and two orientations
 * (`horizontal` / `vertical`). Rendered as a `role="toolbar"` container;
 * presentational only (the actions are supplied by the consumer). The resolver
 * returns one class string per (type, variant, orientation) so both engines stay
 * drop-in compatible.
 */
import type * as React from 'react';

export const TOOLBAR_TYPES = ['floating', 'docked'] as const;
export type ToolbarType = (typeof TOOLBAR_TYPES)[number];

export const TOOLBAR_VARIANTS = ['standard', 'vibrant'] as const;
export type ToolbarVariant = (typeof TOOLBAR_VARIANTS)[number];

export const TOOLBAR_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type ToolbarOrientation = (typeof TOOLBAR_ORIENTATIONS)[number];

export interface ToolbarResolverArgs {
  type: ToolbarType;
  variant: ToolbarVariant;
  orientation: ToolbarOrientation;
}

export type ToolbarClassResolver = (args: ToolbarResolverArgs) => string;

export interface ToolbarOwnProps {
  /** M3 toolbar form: a floating pill or a docked bar. @default 'floating' */
  type?: ToolbarType;
  /** M3 color config. @default 'standard' */
  variant?: ToolbarVariant;
  /** Layout axis. @default 'horizontal' */
  orientation?: ToolbarOrientation;
}

export type ToolbarProps = ToolbarOwnProps & React.HTMLAttributes<HTMLDivElement>;
