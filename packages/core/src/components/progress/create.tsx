'use client';
/**
 * create-progress.tsx — headless M3 Progress parts (Linear + Circular).
 *
 * `Linear` composes Base UI `Progress` (Root/Track/Indicator); the Root exposes
 * `data-indeterminate` / `data-progressing` / `data-complete`, which the engine
 * CSS keys off (the disjoint indeterminate motion lives in CSS). The M3
 * Expressive `wavy` shape masks the active bar with a scrolling sine tile
 * (`--m3-wave`) and sets `data-wavy`. `Circular` is a
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
// M3 indicator↔track gap: the *visible* break (4dp). The round stroke caps each
// extend half the stroke past their arc end, so the centerline spacing must add
// a full stroke width on top of this to actually leave a 4dp break.
const CIRCULAR_GAP = 4;
// Dash lengths are expressed against a normalized `pathLength="100"` so the
// indeterminate keyframes and the determinate gap are radius-independent (they
// stay correct for any `size`).
const PATH_LENGTH = 100;
// Static arc shown for indeterminate before/without motion (reduced-motion).
const INDETERMINATE_ARC = 25;

// ---- M3 Expressive wavy shape -------------------------------------------------
// Determinate linear waves at a 40dp wavelength (`ActiveWaveWavelength`); the
// indeterminate wave is tighter at 20dp (`IndeterminateActiveWaveWavelength`).
// Circular derives its wave count from the ring (`ActiveWaveWavelength` 15dp).
const LINEAR_WAVELENGTH = 40;
const LINEAR_INDETERMINATE_WAVELENGTH = 20;
const LINEAR_AMPLITUDE = 3;
// Circular: `ActiveWaveAmplitude` 1.6dp / `ActiveWaveWavelength` 15dp / `WaveSize`
// 48dp (the wavy ring's outer box grows to 48 while the 40dp ring stays put).
const CIRCULAR_AMPLITUDE = 1.6;
const CIRCULAR_WAVELENGTH = 15;
const CIRCULAR_WAVE_SIZE_RATIO = 48 / 40;

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * A repeating sine tile (one `wavelength`-wide period) as a `mask-image` data URI.
 * The active bar is a solid `primary` rectangle; this mask carves it into a
 * stroked wave of the given `thickness`, and the engine CSS scrolls it by one
 * wavelength (`--m3-wave-size`).
 */
function linearWaveMask(thickness: number, amplitude: number, wavelength: number): string {
  const height = thickness + 2 * amplitude;
  const mid = height / 2;
  const steps = 24;
  let d = `M0 ${mid}`;
  for (let i = 1; i <= steps; i++) {
    const x = round((wavelength * i) / steps);
    const y = round(mid - amplitude * Math.sin((i / steps) * 2 * Math.PI));
    d += `L${x} ${y}`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${wavelength}" height="${height}" viewBox="0 0 ${wavelength} ${height}"><path d="${d}" fill="none" stroke="#000" stroke-width="${thickness}" stroke-linecap="round"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** Point on a circle at `frac` of a turn from the top (12 o'clock), clockwise. */
function pointOnCircle(cx: number, cy: number, r: number, frac: number): [number, number] {
  const a = frac * 2 * Math.PI;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
}

/** Plain (non-wavy) arc path between two fractions, starting at the top. */
function arcPath(cx: number, cy: number, r: number, startFrac: number, endFrac: number): string {
  const [x1, y1] = pointOnCircle(cx, cy, r, startFrac);
  const [x2, y2] = pointOnCircle(cx, cy, r, endFrac);
  const large = endFrac - startFrac > 0.5 ? 1 : 0;
  return `M${round(x1)} ${round(y1)} A${r} ${r} 0 ${large} 1 ${round(x2)} ${round(y2)}`;
}

/** Sine-modulated (wavy) arc path: the radius oscillates `waves` times per turn. */
function wavyArcPath(
  cx: number,
  cy: number,
  r: number,
  startFrac: number,
  endFrac: number,
  amplitude: number,
  waves: number,
): string {
  // Sample evenly and always include `endFrac`: a fixed-step loop would drop the
  // endpoint for a tiny span (`endFrac - startFrac < step`), leaving an `M`-only
  // path that renders nothing.
  const samples = Math.max(1, Math.ceil((endFrac - startFrac) / (1 / (waves * 16))));
  let d = '';
  for (let i = 0; i <= samples; i++) {
    const f = startFrac + ((endFrac - startFrac) * i) / samples;
    const rr = r + amplitude * Math.sin(f * waves * 2 * Math.PI);
    const [x, y] = pointOnCircle(cx, cy, rr, f);
    d += `${d ? 'L' : 'M'}${round(x)} ${round(y)}`;
  }
  return d;
}

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
    { value = null, max = 100, thickness, wavy = false, amplitude, className, style, ...props },
    ref,
  ) {
    // Base UI uses the forwarded value/max raw for both aria and the indicator
    // width, so clamp here to keep the range valid for out-of-bounds input.
    const { safeMax, clampedValue } = normalizeProgress(value, max);
    // Track height is inline (not a class) so `thickness` is honored by both
    // engines (M3 default 4dp, thick variant 8dp).
    const safeThickness =
      Number.isFinite(thickness) && (thickness as number) > 0 ? (thickness as number) : 4;
    // M3 Expressive `wavy` applies to both determinate and indeterminate: the
    // active bar becomes a flowing sine wave (engine CSS masks + scrolls it via
    // `--m3-wave`) and the track grows taller to fit it. The indeterminate wave
    // uses the tighter 20dp wavelength (`IndeterminateActiveWaveWavelength`); the
    // determinate wave uses 40dp (`ActiveWaveWavelength`).
    const indeterminate = clampedValue == null;
    const wave = wavy;
    const amp =
      Number.isFinite(amplitude) && (amplitude as number) > 0
        ? (amplitude as number)
        : LINEAR_AMPLITUDE;
    const waveLength = indeterminate ? LINEAR_INDETERMINATE_WAVELENGTH : LINEAR_WAVELENGTH;
    // Publish the fill fraction as a CSS variable so the engine CSS can place the
    // M3 gap (between the active indicator and the inactive track) and the
    // track-stop dot from it — Base UI sizes the indicator with the same percent.
    // Indeterminate (null) omits it so the inactive track spans the full width.
    // `--m3-thickness` keeps the flat track/stop dot at stroke height even when
    // the wavy root is taller. `--m3-wave-size` is the wavelength the engine CSS
    // uses for the mask tile width and the flow distance.
    // Computed `height` goes before `...style` so an explicit caller
    // `style.height` still wins (back-compat); the internal `--m3-*` vars go
    // after so they always resolve regardless of caller style.
    const rootStyle = {
      height: wave ? safeThickness + 2 * amp : safeThickness,
      ...style,
      '--m3-thickness': `${safeThickness}px`,
      ...(indeterminate ? {} : { '--m3-progress': `${(clampedValue / safeMax) * 100}%` }),
      ...(wave
        ? {
            '--m3-wave': linearWaveMask(safeThickness, amp, waveLength),
            '--m3-wave-size': `${waveLength}px`,
          }
        : {}),
    } as React.CSSProperties;
    return (
      <Progress.Root
        ref={ref}
        value={clampedValue}
        max={safeMax}
        data-wavy={wave ? '' : undefined}
        className={mergeClassName(classes.linear.root, className)}
        style={rootStyle}
        {...props}
      >
        <Progress.Track className={classes.linear.track}>
          <Progress.Indicator className={classes.linear.indicator} />
          {/* Second disjoint bar: idle for determinate, animated when indeterminate. */}
          <span className={classes.linear.indicatorSecondary} aria-hidden="true" />
        </Progress.Track>
      </Progress.Root>
    );
  });
  Linear.displayName = 'M3Progress.Linear';

  const Circular = React.forwardRef<HTMLSpanElement, CircularProgressProps>(function Circular(
    {
      value = null,
      max = 100,
      size,
      thickness,
      wavy = false,
      amplitude,
      className,
      style,
      ...props
    },
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
    const radius = (safeSize - safeThickness) / 2;
    // M3 Expressive `wavy` now applies to both determinate and indeterminate.
    const wave = wavy;
    // `WaveSize`: the wavy ring's outer box grows to 48dp (from the 40dp `Size`)
    // so the wave can extend outward while the ring itself stays at 40dp.
    const boxSize = wave ? safeSize * CIRCULAR_WAVE_SIZE_RATIO : safeSize;
    const center = boxSize / 2;
    // Centerline spacing = the 4dp visible gap + a full stroke so the round caps
    // (which each reach half a stroke past their arc end) don't consume it. As a
    // share of the normalized 100-unit path:
    const gap = ((CIRCULAR_GAP + safeThickness) / (2 * Math.PI * radius)) * PATH_LENGTH;
    const fraction = indeterminate ? 0 : clampedValue / safeMax;
    const active = fraction * PATH_LENGTH;
    // Inactive track spans the remainder minus a gap at each end (hidden when the
    // active arc is (almost) full so a stray rounded-cap dot can't appear).
    const inactive = PATH_LENGTH - active - gap * 2;

    // The active arc is drawn as a sine-modulated path when wavy. The 48dp box
    // gives outward room, so the wave oscillates around the true ring radius
    // (`ActiveWaveAmplitude` 1.6dp, `ActiveWaveWavelength` 15dp).
    const amp = Math.min(
      Number.isFinite(amplitude) && (amplitude as number) > 0
        ? (amplitude as number)
        : CIRCULAR_AMPLITUDE,
      Math.max(0, radius - safeThickness),
    );
    const waveRadius = radius;
    const waves = Math.max(3, Math.round((2 * Math.PI * waveRadius) / CIRCULAR_WAVELENGTH));
    // Same cap allowance as the plain ring: 4dp visible gap + a full stroke.
    const gapFrac = (CIRCULAR_GAP + safeThickness) / (2 * Math.PI * waveRadius);
    const inactiveStart = fraction + gapFrac;
    const inactiveEnd = 1 - gapFrac;

    // Root sizing is inline (not a class) so `size` is honored by both engines.
    // Computed size goes first so an explicit caller `style.width/height` still
    // wins (back-compat: pre-`size` callers sized the ring via inline style).
    const rootStyle = { width: boxSize, height: boxSize, ...style } as React.CSSProperties;
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
        data-wavy={wave ? '' : undefined}
        className={cx(classes.circular.root, className)}
        style={rootStyle}
        {...props}
      >
        <svg viewBox={`0 0 ${boxSize} ${boxSize}`} aria-hidden="true">
          {wave ? (
            indeterminate ? (
              // Wavy indeterminate: a fixed-sweep sine-modulated arc anchored at
              // the top; the engine CSS rotation on the root spins it (advance).
              <g transform={`rotate(-90 ${center} ${center})`}>
                <path
                  className={classes.circular.indicator}
                  fill="none"
                  strokeWidth={safeThickness}
                  d={wavyArcPath(
                    center,
                    center,
                    waveRadius,
                    0,
                    INDETERMINATE_ARC / PATH_LENGTH,
                    amp,
                    waves,
                  )}
                />
              </g>
            ) : (
              // Wavy determinate: sine-modulated active arc + a plain inactive arc,
              // both anchored at the top (the paths carry their own geometry, so no
              // rotate wrapper). Round caps come from the slot classes.
              <>
                {inactiveEnd - inactiveStart > 0.001 ? (
                  <path
                    className={classes.circular.track}
                    fill="none"
                    strokeWidth={safeThickness}
                    d={arcPath(center, center, waveRadius, inactiveStart, inactiveEnd)}
                  />
                ) : null}
                {fraction > 0 ? (
                  <path
                    className={classes.circular.indicator}
                    fill="none"
                    strokeWidth={safeThickness}
                    d={wavyArcPath(center, center, waveRadius, 0, fraction, amp, waves)}
                  />
                ) : null}
              </>
            )
          ) : (
            // Rotate so both arcs start at the top (12 o'clock) and grow clockwise.
            <g transform={`rotate(-90 ${center} ${center})`}>
              {indeterminate ? (
                // One arc; the length + offset are animated by the engine CSS
                // (advance = grow/shrink while the ring rotates). The inline dash
                // is the static reduced-motion fallback.
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
          )}
        </svg>
      </span>
    );
  });
  Circular.displayName = 'M3Progress.Circular';

  return { Linear, Circular };
}
