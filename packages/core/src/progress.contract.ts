/**
 * progress.contract.ts — slot classes + props for the M3 Progress indicators.
 *
 * Two shapes share one factory: `Linear` (Base UI `Progress` parts) and
 * `Circular` (an SVG ring with `role="progressbar"`). Both support determinate
 * (`value` 0…max) and indeterminate (`value` omitted/null) modes; the active
 * indicator is `primary`, the track `surface-container-highest`. The class
 * resolver supplies one string per slot so the two engines emit the same DOM
 * and `data-*` state.
 */
import type * as React from 'react';

export interface ProgressSlotClasses {
  root: string;
  track: string;
  indicator: string;
}

export interface ProgressClasses {
  linear: ProgressSlotClasses;
  circular: ProgressSlotClasses;
}

export interface LinearProgressOwnProps {
  /** Completion 0…`max`. Omit (or pass `null`) for the indeterminate animation. */
  value?: number | null;
  /** Maximum value. @default 100 */
  max?: number;
}

export type LinearProgressProps = LinearProgressOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue'>;

export interface CircularProgressOwnProps {
  /** Completion 0…`max`. Omit (or pass `null`) for the indeterminate spinner. */
  value?: number | null;
  /** Maximum value. @default 100 */
  max?: number;
}

export type CircularProgressProps = CircularProgressOwnProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'value' | 'defaultValue'>;
