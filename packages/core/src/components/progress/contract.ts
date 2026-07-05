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

export interface LinearProgressSlotClasses extends ProgressSlotClasses {
  /**
   * The second disjoint bar. It's always in the DOM (drop-in parity) but only
   * shown/animated for the indeterminate state, giving M3's two-segment motion.
   */
  indicatorSecondary: string;
}

export interface ProgressClasses {
  linear: LinearProgressSlotClasses;
  circular: ProgressSlotClasses;
}

export interface LinearProgressOwnProps {
  /** Completion 0…`max`. Omit (or pass `null`) for the indeterminate animation. */
  value?: number | null;
  /** Maximum value. @default 100 */
  max?: number;
  /** Track thickness in px (M3 default 4dp; thick variant 8dp). @default 4 */
  thickness?: number;
}

export type LinearProgressProps = LinearProgressOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue'>;

export interface CircularProgressOwnProps {
  /** Completion 0…`max`. Omit (or pass `null`) for the indeterminate spinner. */
  value?: number | null;
  /** Maximum value. @default 100 */
  max?: number;
  /**
   * Outer diameter in px. M3 default is 40dp (spec range 24–240dp); a
   * non-finite/non-positive value falls back to 40. @default 40
   */
  size?: number;
  /** Stroke thickness in px (M3 default 4dp; thick variant 8dp). @default 4 */
  thickness?: number;
}

export type CircularProgressProps = CircularProgressOwnProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'value' | 'defaultValue'>;
