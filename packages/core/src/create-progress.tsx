'use client';
/**
 * create-progress.tsx — headless M3 Progress parts (Linear + Circular).
 *
 * `Linear` composes Base UI `Progress` (Root/Track/Indicator); the Root exposes
 * `data-indeterminate` / `data-progressing` / `data-complete`, which the engine
 * CSS keys off (the indeterminate slide animation lives in CSS). `Circular` is a
 * self-contained SVG ring with `role="progressbar"`: the active arc is drawn via
 * `stroke-dasharray`/`stroke-dashoffset` derived from `value`, and the
 * indeterminate spinner rotates the whole ring (`data-indeterminate`). Each
 * engine injects slot classes, so both builds share one DOM + `data-*` contract.
 */
import * as React from 'react';
import { Progress } from '@base-ui/react/progress';

import type {
  CircularProgressProps,
  LinearProgressProps,
  ProgressClasses,
} from './progress.contract';
import { cx } from './utils';
import { mergeClassName } from './slot';

// 48dp ring, 4dp stroke → radius (48 − 4) / 2 = 22.
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// Indeterminate spinner shows a 3/4 arc while it rotates.
const INDETERMINATE_FRACTION = 0.75;

/**
 * Normalize a determinate progress pair: a finite, positive `max` (NaN, Infinity
 * or a non-positive value falls back to 100) and the value clamped to `[0, max]`
 * so `aria-valuenow` and the drawn indicator never exceed the range. A `null` or
 * non-finite value (e.g. `loaded / total` with `total === 0`) becomes `null`,
 * rendering the indeterminate state rather than `NaN`/`Infinity`.
 */
function normalizeProgress(
  value: number | null,
  max: number,
): { safeMax: number; clampedValue: number | null } {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const clampedValue =
    value == null || !Number.isFinite(value) ? null : Math.max(0, Math.min(safeMax, value));
  return { safeMax, clampedValue };
}

export function createProgress(classes: ProgressClasses) {
  const Linear = React.forwardRef<HTMLDivElement, LinearProgressProps>(function Linear(
    { value = null, max = 100, className, ...props },
    ref,
  ) {
    // Base UI uses the forwarded value/max raw for both aria and the indicator
    // width, so clamp here to keep the range valid for out-of-bounds input.
    const { safeMax, clampedValue } = normalizeProgress(value, max);
    return (
      <Progress.Root
        ref={ref}
        value={clampedValue}
        max={safeMax}
        className={mergeClassName(classes.linear.root, className)}
        {...props}
      >
        <Progress.Track className={classes.linear.track}>
          <Progress.Indicator className={classes.linear.indicator} />
        </Progress.Track>
      </Progress.Root>
    );
  });
  Linear.displayName = 'M3Progress.Linear';

  const Circular = React.forwardRef<HTMLSpanElement, CircularProgressProps>(function Circular(
    { value = null, max = 100, className, ...props },
    ref,
  ) {
    // Clamp the value so the drawn arc and the announced `aria-valuenow` agree,
    // and guard a non-positive `max` (would make `value / max` NaN).
    const { safeMax, clampedValue } = normalizeProgress(value, max);
    const indeterminate = clampedValue == null;
    const fraction = indeterminate ? INDETERMINATE_FRACTION : clampedValue / safeMax;
    const dashoffset = CIRCUMFERENCE * (1 - fraction);

    return (
      <span
        ref={ref}
        role="progressbar"
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : safeMax}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        data-indeterminate={indeterminate ? '' : undefined}
        className={cx(classes.circular.root, className)}
        {...props}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true">
          {indeterminate ? null : (
            <circle className={classes.circular.track} cx="24" cy="24" r={RADIUS} fill="none" />
          )}
          <circle
            className={classes.circular.indicator}
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashoffset}
            transform="rotate(-90 24 24)"
          />
        </svg>
      </span>
    );
  });
  Circular.displayName = 'M3Progress.Circular';

  return { Linear, Circular };
}
