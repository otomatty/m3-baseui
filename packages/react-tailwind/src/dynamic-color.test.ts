/**
 * Token snapshot — guards the dynamic-color pipeline (issue #4, 設計書 §9).
 *
 * `@m3-baseui/core`'s `generateScheme` wraps `@material/material-color-utilities` to
 * produce the 47+ `--md-sys-color-*` roles at runtime. These tests pin that
 * output so an accidental change to the wrapper, the role list, or a
 * material-color-utilities version bump surfaces as an intentional snapshot
 * review instead of a silent dynamic-color regression.
 *
 * Note: the static baseline in `@m3-baseui/tokens` follows the published M3 reference
 * scheme, which intentionally diverges from the current MCU algorithm output
 * for some on-container roles — so we snapshot the MCU output rather than
 * asserting strict equality with the baseline. The structural checks below tie
 * the two together: every baseline role must be produced by the pipeline.
 */
import { describe, expect, test } from 'bun:test';

import { generateScheme } from '@m3-baseui/core';
import { tokens } from '@m3-baseui/tokens';

/** The seed the published M3 baseline (and the playground default) is built on. */
const BASELINE_SEED = '#6750A4';
const ROLE_KEYS = Object.keys(tokens.sys.color) as (keyof typeof tokens.sys.color)[];
const TRIPLE = /^\d{1,3} \d{1,3} \d{1,3}$/;

describe('dynamic color — token snapshot', () => {
  test('baseline seed (tonalSpot/standard) produces a stable scheme', () => {
    expect(generateScheme(BASELINE_SEED, 'tonalSpot', 'standard')).toMatchSnapshot();
  });

  test('alternate variants stay stable', () => {
    expect(generateScheme(BASELINE_SEED, 'vibrant', 'standard')).toMatchSnapshot('vibrant');
    expect(generateScheme(BASELINE_SEED, 'expressive', 'standard')).toMatchSnapshot('expressive');
  });

  test('high contrast stays stable', () => {
    expect(generateScheme(BASELINE_SEED, 'tonalSpot', 'high')).toMatchSnapshot('high-contrast');
  });

  test('a custom seed stays stable', () => {
    expect(generateScheme('#386A20', 'tonalSpot', 'standard')).toMatchSnapshot('green-seed');
  });
});

describe('dynamic color — structural contract', () => {
  const scheme = generateScheme(BASELINE_SEED, 'tonalSpot', 'standard');

  test('every baseline color role is produced for light and dark', () => {
    for (const role of ROLE_KEYS) {
      expect(scheme.light[role], `light ${role}`).toMatch(TRIPLE);
      expect(scheme.dark[role], `dark ${role}`).toMatch(TRIPLE);
    }
  });

  test('produces exactly the baseline role set (no missing/extra roles)', () => {
    expect(Object.keys(scheme.light).sort()).toEqual([...ROLE_KEYS].sort());
  });

  test('channel triples are valid 0–255 bytes', () => {
    for (const role of ROLE_KEYS) {
      for (const channels of [scheme.light[role], scheme.dark[role]]) {
        for (const c of channels.split(' ').map(Number)) {
          expect(c).toBeGreaterThanOrEqual(0);
          expect(c).toBeLessThanOrEqual(255);
        }
      }
    }
  });
});
