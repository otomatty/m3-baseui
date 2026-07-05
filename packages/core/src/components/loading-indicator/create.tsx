'use client';
/**
 * create-loading-indicator.tsx — headless M3 Expressive Loading indicator.
 *
 * An indeterminate `role="progressbar"` whose active indicator continuously
 * morphs through the seven M3 Expressive shapes — SoftBurst → Cookie9Sided →
 * Pentagon → Pill → Sunny → Cookie4Sided → Oval — while spinning. That morphing
 * silhouette is the visual identity that sets it apart from `Progress` (a bar /
 * ring). The geometry is derived once here so both engines draw the identical
 * shapes: each shape is sampled to the *same* number of points (an `M … L … Z`
 * closed polyline) so the browser can interpolate `d` from one to the next. The
 * shape morph runs via the Web Animations API (engine-agnostic, so both builds
 * behave identically and it respects `prefers-reduced-motion`); the steady global
 * rotation (`GlobalRotationDurationMillis` ≈ 4666ms) is a CSS animation supplied
 * by each engine. `data-contained` marks the container config. Same DOM + `data-*`
 * across builds.
 */
import * as React from 'react';

import type { LoadingIndicatorClassResolver, LoadingIndicatorProps } from './contract';
import { cx } from '../../utils';

/** 48dp viewBox; the active indicator spans ~38dp (M3 `ActiveSize`). */
const CENTER = 24;
const OUTER = 19;
// Points per shape. Every shape uses the same count so `d` interpolates cleanly.
const SAMPLES = 60;
const TAU = Math.PI * 2;
// MaterialShapes morph fires every `MorphIntervalMillis`; a full cycle is the
// seven shapes back to the first.
const MORPH_INTERVAL_MS = 650;

const round = (n: number) => Math.round(n * 100) / 100;

/** Maps a sample angle to an (x, y) point for one shape. */
type ShapeFn = (t: number) => [number, number];

/** Radial silhouette: distance from the centre as a function of angle. */
const radial =
  (r: (t: number) => number): ShapeFn =>
  (t) => [CENTER + r(t) * Math.cos(t), CENTER + r(t) * Math.sin(t)];

/** Superellipse |x/a|^n + |y/b|^n = 1 sampled by angle (the Pill / squircle). */
const superellipse =
  (a: number, b: number, n: number): ShapeFn =>
  (t) => {
    const ct = Math.cos(t);
    const st = Math.sin(t);
    const p = 2 / n;
    return [
      CENTER + a * Math.sign(ct) * Math.abs(ct) ** p,
      CENTER + b * Math.sign(st) * Math.abs(st) ** p,
    ];
  };

/** Regular n-gon apothem radial, softened toward a circle to round the corners. */
const roundedPolygon =
  (sides: number, r: number, soften: number): ((t: number) => number) =>
  (t) => {
    const seg = TAU / sides;
    const a = ((t % seg) + seg) % seg;
    const raw = Math.cos(Math.PI / sides) / Math.cos(a - Math.PI / sides);
    return r * (soften + (1 - soften) * raw);
  };

// The seven MaterialShapes of the M3 Expressive loading indicator morph, in the
// order Compose cycles them. Radii stay under `OUTER` (19dp) so a spinning lobe
// never clips the 38dp active-indicator box.
const SHAPE_FNS: ShapeFn[] = [
  radial((t) => 15.5 + 2.2 * Math.cos(10 * t)), // SoftBurst
  radial((t) => 15.5 + 3 * Math.cos(9 * t)), // Cookie9Sided
  radial(roundedPolygon(5, 17, 0.35)), // Pentagon
  superellipse(18, 11, 4), // Pill
  radial((t) => 15 + 3.3 * Math.cos(8 * t)), // Sunny
  radial((t) => 15 + 3.3 * Math.cos(4 * t)), // Cookie4Sided
  (t) => [CENTER + 18 * Math.cos(t), CENTER + 13 * Math.sin(t)], // Oval
];

/** Sample a shape into a closed `M … L … Z` polyline (uniform point count). */
function shapePath(fn: ShapeFn): string {
  let d = '';
  for (let i = 0; i < SAMPLES; i++) {
    const [x, y] = fn((TAU * i) / SAMPLES);
    d += `${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`;
  }
  return `${d}Z`;
}

const SHAPES = SHAPE_FNS.map(shapePath);
// Tight viewBox around the outer radius so the SVG bounds the 38dp active
// indicator exactly: `contained` renders a real 48dp container with the shape
// inset, `uncontained` is just the 38dp shape.
const VIEWBOX = `${CENTER - OUTER} ${CENTER - OUTER} ${2 * OUTER} ${2 * OUTER}`;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function createLoadingIndicator(resolve: LoadingIndicatorClassResolver) {
  const LoadingIndicator = React.forwardRef<HTMLSpanElement, LoadingIndicatorProps>(
    function LoadingIndicator({ contained = false, className, ...props }, ref) {
      const classes = resolve({ contained });
      const pathRef = React.useRef<SVGPathElement>(null);

      // Morph through the seven shapes (650ms each), looping seamlessly back to
      // the first. The Web Animations API keeps this engine-agnostic (identical
      // in both builds) and lets us honor prefers-reduced-motion. The steady
      // rotation is a separate CSS animation on the shape (per engine).
      React.useEffect(() => {
        const path = pathRef.current;
        if (!path || typeof path.animate !== 'function' || prefersReducedMotion()) return;
        const frames = SHAPES.map((d, i) => ({
          d: `path("${d}")`,
          offset: i / SHAPES.length,
          // Each morph settles before the next fires (Compose uses a spring).
          easing: 'ease-in-out',
        }));
        frames.push({ d: `path("${SHAPES[0]}")`, offset: 1, easing: 'ease-in-out' });
        try {
          const anim = path.animate(frames, {
            duration: MORPH_INTERVAL_MS * SHAPES.length,
            iterations: Number.POSITIVE_INFINITY,
          });
          return () => anim.cancel();
        } catch {
          // Environments without a working WAAPI (e.g. the unit-test DOM) simply
          // render the static first shape — no throw, no morph.
        }
      }, []);

      // `props` are spread first so the shared DOM/`data-*` contract (role,
      // data-contained) stays authoritative and cannot be desynced by a caller.
      return (
        <span
          {...props}
          ref={ref}
          role="progressbar"
          data-contained={contained ? '' : undefined}
          className={cx(classes.root, className)}
        >
          <svg viewBox={VIEWBOX} aria-hidden="true">
            <path ref={pathRef} className={classes.indicator} d={SHAPES[0]} />
          </svg>
        </span>
      );
    },
  );
  LoadingIndicator.displayName = 'M3LoadingIndicator';
  return LoadingIndicator;
}
