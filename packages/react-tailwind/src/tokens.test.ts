/**
 * Token contract — M3 Expressive tokens (issue #7, 設計書 §4.3 / §4.7 / §2.21).
 *
 * Pins the two additive groups introduced for M3 Expressive against the single
 * source of truth (`@m3-baseui/tokens`):
 *
 *  - **Emphasized typescale** — a heavier-weight companion for each of the 15
 *    base roles (`<role>Emphasized`). Same metrics, heavier weight, so the
 *    layout is unchanged while the type reads as emphasized.
 *  - **Spring motion** — spatial (slight overshoot) and effects (no overshoot)
 *    spring-derived easings + durations at three speeds (fast/default/slow),
 *    approximated as CSS `cubic-bezier` + `ms` for the web.
 *
 * Also guards backward compatibility: every pre-Expressive role must survive.
 */
import { describe, expect, test } from 'bun:test';

import { tokens } from '@m3-baseui/tokens';

const BASE_TYPESCALE = [
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'headlineLarge',
  'headlineMedium',
  'headlineSmall',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'bodyLarge',
  'bodyMedium',
  'bodySmall',
  'labelLarge',
  'labelMedium',
  'labelSmall',
] as const;

describe('M3 Expressive — emphasized typescale', () => {
  test('every base role has an emphasized companion', () => {
    for (const role of BASE_TYPESCALE) {
      const emphasized = `${role}Emphasized` as keyof typeof tokens.sys.typescale;
      expect(tokens.sys.typescale[emphasized], emphasized).toBeDefined();
    }
  });

  test('emphasized keeps the base metrics (size/line-height) so layout is stable', () => {
    for (const role of BASE_TYPESCALE) {
      const base = tokens.sys.typescale[role];
      const emphasized =
        tokens.sys.typescale[`${role}Emphasized` as keyof typeof tokens.sys.typescale];
      expect(emphasized.fontSize, `${role} size`).toBe(base.fontSize);
      expect(emphasized.lineHeight, `${role} line-height`).toBe(base.lineHeight);
      expect(emphasized.fontFamily, `${role} family`).toBe(base.fontFamily);
    }
  });

  test('emphasized weight is at least as heavy as the base weight', () => {
    for (const role of BASE_TYPESCALE) {
      const base = Number(tokens.sys.typescale[role].fontWeight);
      const emphasized = Number(
        tokens.sys.typescale[`${role}Emphasized` as keyof typeof tokens.sys.typescale].fontWeight,
      );
      expect(emphasized, `${role} weight`).toBeGreaterThanOrEqual(base);
    }
  });
});

describe('M3 Expressive — spring motion', () => {
  const SPRINGS = [
    'springSpatialFast',
    'springSpatialDefault',
    'springSpatialSlow',
    'springEffectsFast',
    'springEffectsDefault',
    'springEffectsSlow',
  ] as const;

  test('each spring exposes both an easing and a duration', () => {
    for (const spring of SPRINGS) {
      expect(
        tokens.sys.motion.easing[spring as keyof typeof tokens.sys.motion.easing],
        `${spring} easing`,
      ).toMatch(/^cubic-bezier\(/);
      expect(
        tokens.sys.motion.duration[spring as keyof typeof tokens.sys.motion.duration],
        `${spring} duration`,
      ).toMatch(/^\d+ms$/);
    }
  });

  test('spatial springs overshoot (control-point y1 > 1) while effects springs do not', () => {
    // cubic-bezier(x1, y1, x2, y2): a y1 above 1 lifts the curve past the
    // target mid-flight — the M3 Expressive spatial "bounce".
    const y1 = (curve: string) => Number(curve.replace(/cubic-bezier\(|\)/g, '').split(',')[1]);
    expect(y1(tokens.sys.motion.easing.springSpatialDefault)).toBeGreaterThan(1);
    expect(y1(tokens.sys.motion.easing.springEffectsDefault)).toBeLessThanOrEqual(1);
  });
});

describe('M3 Expressive — backward compatibility', () => {
  test('all pre-Expressive typescale roles survive', () => {
    for (const role of BASE_TYPESCALE) {
      expect(tokens.sys.typescale[role], role).toBeDefined();
    }
  });

  test('all pre-Expressive motion easings survive', () => {
    for (const easing of [
      'standard',
      'standardAccelerate',
      'standardDecelerate',
      'emphasized',
      'emphasizedAccelerate',
      'emphasizedDecelerate',
    ] as const) {
      expect(tokens.sys.motion.easing[easing], easing).toBeDefined();
    }
  });
});
