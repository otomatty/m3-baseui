/**
 * Tailwind v4 @theme preset — color token validity.
 *
 * Tailwind v4 does NOT substitute the v3 `<alpha-value>` placeholder inside an
 * `@theme` block, so emitting `rgb(var(--md-sys-color-x) / <alpha-value>)` leaves
 * every `--color-*` variable as an invalid color string. Utilities that read it
 * (`bg-primary`, `text-on-primary`, `border-outline`, …) then resolve to
 * transparent / `currentColor`, silently breaking the whole dynamic-color layer.
 *
 * v4 derives opacity modifiers (`bg-primary/12`) via `color-mix()` off the bare
 * color, so the channel-triple must be wrapped as a plain `rgb(var(--md-sys-…))`.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'bun:test';

const themeCss = readFileSync(
  join(import.meta.dir, '..', '..', 'tokens', 'styles', 'theme.css'),
  'utf8',
);

describe('Tailwind @theme color tokens', () => {
  test('never emit the v3 <alpha-value> placeholder (invalid in v4 @theme)', () => {
    expect(themeCss).not.toContain('<alpha-value>');
  });

  test('every --color-* maps to a valid rgb(var(--md-sys-color-*))', () => {
    const colorLines = themeCss.split('\n').filter((l) => /^\s*--color-/.test(l));
    expect(colorLines.length).toBeGreaterThan(0);
    for (const line of colorLines) {
      expect(line.trim(), line.trim()).toMatch(
        /^--color-[a-z0-9-]+: rgb\(var\(--md-sys-color-[a-z0-9-]+\)\);$/,
      );
    }
  });

  test('primary maps to its channel-triple system var', () => {
    expect(themeCss).toContain('--color-primary: rgb(var(--md-sys-color-primary));');
  });
});
