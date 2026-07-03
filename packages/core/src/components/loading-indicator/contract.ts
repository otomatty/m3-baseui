/**
 * loading-indicator.contract.ts — slot classes + props for the M3 Expressive
 * Loading indicator.
 *
 * Distinct from `Progress`: the loading indicator is an *indeterminate-only*
 * active indicator — a soft 7-lobed shape that continuously rotates and morphs
 * while content loads (M3 Expressive). Rendered as a self-contained SVG with
 * `role="progressbar"` (no `aria-valuenow`). Two configurations share one
 * factory: `uncontained` (the bare shape) and `contained` (the shape on a
 * filled container). The class resolver supplies one string per slot so both
 * engines emit the same DOM and `data-*` state.
 */
import type * as React from 'react';

export interface LoadingIndicatorSlotClasses {
  root: string;
  indicator: string;
}

export interface LoadingIndicatorResolverArgs {
  /** Render the shape on a filled container (M3 "contained" config). */
  contained: boolean;
}

export type LoadingIndicatorClassResolver = (
  args: LoadingIndicatorResolverArgs,
) => LoadingIndicatorSlotClasses;

export interface LoadingIndicatorOwnProps {
  /** Show the M3 "contained" variant (active indicator on a container). @default false */
  contained?: boolean;
}

export type LoadingIndicatorProps = LoadingIndicatorOwnProps &
  React.HTMLAttributes<HTMLSpanElement>;
