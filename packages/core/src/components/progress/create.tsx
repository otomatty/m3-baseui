'use client';
/**
 * create-progress.tsx — headless M3 Progress parts (Linear + Circular).
 *
 * `Linear` composes Base UI `Progress` (Root/Track/Indicator); the Root exposes
 * `data-indeterminate` / `data-progressing` / `data-complete`, which the engine
 * CSS keys off (the indeterminate slide animation lives in CSS). `Circular` is a
 * self-contained SVG ring with `role="progressbar"`: the active arc and the
 * inactive track are drawn via `stroke-dasharray`/`stroke-dashoffset` (normalized
 * to `pathLength="100"`) with a 4dp gap and rounded caps per M3. Indeterminate
 * rotates the ring (`data-indeterminate`) while the arc grows/shrinks (advance).
 * Each engine injects slot classes, so both builds share one DOM + `data-*`.
 */
import * as React from 'react';
import { Progress } from '@base-ui/react/progress';

import type { CircularProgressProps, LinearProgressProps, ProgressClasses } from './contract';
import { cx } from '../../utils';
import { mergeClassName } from '../../slot';

// M3 circular defaults: 40dp outer diameter, 4dp stroke (spec range 24–240dp).
const CIRCULAR_SIZE = 40;
const CIRCULAR_THICKNESS = 4;
// Dash lengths are expressed against a normalized `pathLength="100"` so the
// indeterminate keyframes and the determinate gap are radius-independent (they
// stay correct for any `size`).
const PATH_LENGTH = 100;
// Static arc shown for indeterminate before/without motion (reduced-motion).
const INDETERMINATE_ARC = 25;

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
    { value = null, max = 100, className, style, ...props },
    ref,
  ) {
    // Base UI uses the forwarded value/max raw for both aria and the indicator
    // width, so clamp here to keep the range valid for out-of-bounds input.
    const { safeMax, clampedValue } = normalizeProgress(value, max);
    // Publish the fill fraction as a CSS variable so the engine CSS can place the
    // M3 gap (between the active indicator and the inactive track) and the
    // track-stop dot from it — Base UI sizes the indicator with the same percent.
    // Indeterminate (null) omits it so the inactive track spans the full width.
    const fillStyle =
      clampedValue == null
        ? style
        : ({
            ...style,
            '--m3-progress': `${(clampedValue / safeMax) * 100}%`,
          } as React.CSSProperties);
    return (
      <Progress.Root
        ref={ref}
        value={clampedValue}
        max={safeMax}
        className={mergeClassName(classes.linear.root, className)}
        style={fillStyle}
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
    { value = null, max = 100, size, thickness, className, style, ...props },
    ref,
  ) {
    // Clamp the value so the drawn arc and the announced `aria-valuenow` agree,
    // and guard a non-positive `max` (would make `value / max` NaN).
    const { safeMax, clampedValue } = normalizeProgress(value, max);
    const indeterminate = clampedValue == null;

    // Sanitize geometry: a non-finite/non-positive `size`/`thickness` falls back
    // to the M3 defaults, and the stroke can't exceed the diameter (radius > 0).
    const safeSize =
      Number.isFinite(size) && (size as number) > 0 ? (size as number) : CIRCULAR_SIZE;
    const safeThickness =
      Number.isFinite(thickness) && (thickness as number) > 0
        ? Math.min(thickness as number, safeSize / 2)
        : Math.min(CIRCULAR_THICKNESS, safeSize / 2);
    const center = safeSize / 2;
    const radius = (safeSize - safeThickness) / 2;
    // M3 leaves a ~4dp gap (≈ the stroke thickness) between the active arc and
    // the inactive track; as a share of the normalized 100-unit path that is:
    const gap = (safeThickness / (2 * Math.PI * radius)) * PATH_LENGTH;
    const fraction = indeterminate ? 0 : clampedValue / safeMax;
    const active = fraction * PATH_LENGTH;
    // Inactive track spans the remainder minus a gap at each end (hidden when the
    // active arc is (almost) full so a stray rounded-cap dot can't appear).
    const inactive = PATH_LENGTH - active - gap * 2;

    // Root sizing is inline (not a class) so `size` is honored by both engines.
    const rootStyle = { ...style, width: safeSize, height: safeSize } as React.CSSProperties;
    const common = {
      cx: center,
      cy: center,
      r: radius,
      fill: 'none',
      strokeWidth: safeThickness,
      pathLength: PATH_LENGTH,
    } as const;

    return (
      <span
        ref={ref}
        role="progressbar"
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : safeMax}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        data-indeterminate={indeterminate ? '' : undefined}
        className={cx(classes.circular.root, className)}
        style={rootStyle}
        {...props}
      >
        <svg viewBox={`0 0 ${safeSize} ${safeSize}`} aria-hidden="true">
          {/* Rotate so both arcs start at the top (12 o'clock) and grow clockwise. */}
          <g transform={`rotate(-90 ${center} ${center})`}>
            {indeterminate ? (
              // One arc; the length + offset are animated by the engine CSS
              // (advance = grow/shrink while the ring rotates). The inline dash is
              // the static reduced-motion fallback.
              <circle
                {...common}
                className={classes.circular.indicator}
                strokeDasharray={`${INDETERMINATE_ARC} ${PATH_LENGTH}`}
              />
            ) : (
              <>
                {inactive > 0.5 ? (
                  <circle
                    {...common}
                    className={classes.circular.track}
                    strokeDasharray={`${inactive} ${PATH_LENGTH}`}
                    strokeDashoffset={-(active + gap)}
                  />
                ) : null}
                {active > 0 ? (
                  <circle
                    {...common}
                    className={classes.circular.indicator}
                    strokeDasharray={`${active} ${PATH_LENGTH}`}
                    strokeDashoffset={0}
                  />
                ) : null}
              </>
            )}
          </g>
        </svg>
      </span>
    );
  });
  Circular.displayName = 'M3Progress.Circular';

  return { Linear, Circular };
}
