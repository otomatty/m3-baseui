'use client';
/**
 * create-loading-indicator.tsx — headless M3 Expressive Loading indicator.
 *
 * An indeterminate `role="progressbar"` whose active indicator is a soft,
 * 7-lobed shape ("cookie") that rotates and morphs while loading — the visual
 * identity that sets it apart from `Progress` (a bar / ring). The shape path is
 * derived once here so both engines draw the identical geometry; each engine
 * injects the slot classes (and the rotate/morph animation lives in CSS, keyed
 * off no state — it always animates). `data-contained` marks the container
 * config. Same DOM + `data-*` across builds.
 */
import * as React from 'react';

import type {
  LoadingIndicatorClassResolver,
  LoadingIndicatorProps,
} from './loading-indicator.contract';
import { cx } from './utils';

/** 48dp viewBox; the active indicator spans ~38dp (M3 measurement). */
const CENTER = 24;
const OUTER = 19;
const INNER = 13;
const PETALS = 7;

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Build a smooth, closed "flower" path: `PETALS` lobes formed by alternating an
 * outer (tip) and inner (valley) radius, then rounded via midpoint smoothing
 * (each polygon vertex becomes a quadratic control point, the curve passing
 * through edge midpoints). Pure geometry → identical output in both engines.
 */
function flowerPath(): string {
  const pts: Array<[number, number]> = [];
  const count = PETALS * 2;
  for (let i = 0; i < count; i++) {
    const r = i % 2 === 0 ? OUTER : INNER;
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    pts.push([CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)]);
  }
  const n = pts.length;
  const pt = (i: number): [number, number] => pts[((i % n) + n) % n] ?? [CENTER, CENTER];
  const mid = (a: [number, number], b: [number, number]): [number, number] => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];
  const fmt = (p: [number, number]) => `${round(p[0])} ${round(p[1])}`;
  let d = `M${fmt(mid(pt(-1), pt(0)))}`;
  for (let i = 0; i < n; i++) {
    d += ` Q${fmt(pt(i))} ${fmt(mid(pt(i), pt(i + 1)))}`;
  }
  return `${d}Z`;
}

const SHAPE = flowerPath();

export function createLoadingIndicator(resolve: LoadingIndicatorClassResolver) {
  const LoadingIndicator = React.forwardRef<HTMLSpanElement, LoadingIndicatorProps>(
    function LoadingIndicator({ contained = false, className, ...props }, ref) {
      const classes = resolve({ contained });
      return (
        <span
          ref={ref}
          role="progressbar"
          data-contained={contained ? '' : undefined}
          className={cx(classes.root, className)}
          {...props}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path className={classes.indicator} d={SHAPE} />
          </svg>
        </span>
      );
    },
  );
  LoadingIndicator.displayName = 'M3LoadingIndicator';
  return LoadingIndicator;
}
