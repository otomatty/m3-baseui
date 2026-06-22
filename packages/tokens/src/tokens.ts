/**
 * tokens.ts — THE single source of truth for the design system.
 *
 * Every generated artifact (CSS variables, vanilla-extract contract, Tailwind
 * v4 `@theme`) is derived from this object. Do not hand-edit the generated
 * files; change values here and re-run `bun run build`.
 *
 * Colors are stored as "R G B" channel triples so that opacity modifiers
 * (`bg-primary/12`), `color-mix`, and state-layer compositing all work without
 * re-deriving values per engine.
 *
 * Baseline values follow the Material Design 3 reference scheme (seed #6750A4).
 * At runtime the `ThemeProvider` in `@m3/core` can overwrite the `--md-sys-color-*`
 * variables with a dynamically generated scheme.
 */
import type { Tokens } from './types';

const PLAIN = "var(--md-ref-typeface-plain, 'Roboto', system-ui, sans-serif)";
const BRAND = "var(--md-ref-typeface-brand, 'Roboto', system-ui, sans-serif)";

export const tokens = {
  sys: {
    /** System color — 47 semantic roles, light & dark. */
    color: {
      primary: { light: '103 80 164', dark: '208 188 255' },
      onPrimary: { light: '255 255 255', dark: '56 30 114' },
      primaryContainer: { light: '234 221 255', dark: '79 55 139' },
      onPrimaryContainer: { light: '33 0 93', dark: '234 221 255' },

      secondary: { light: '98 91 113', dark: '204 194 220' },
      onSecondary: { light: '255 255 255', dark: '51 45 65' },
      secondaryContainer: { light: '232 222 248', dark: '74 68 88' },
      onSecondaryContainer: { light: '29 25 43', dark: '232 222 248' },

      tertiary: { light: '125 82 96', dark: '239 184 200' },
      onTertiary: { light: '255 255 255', dark: '73 37 50' },
      tertiaryContainer: { light: '255 216 228', dark: '99 59 72' },
      onTertiaryContainer: { light: '49 17 29', dark: '255 216 228' },

      error: { light: '179 38 30', dark: '242 184 181' },
      onError: { light: '255 255 255', dark: '96 20 16' },
      errorContainer: { light: '249 222 220', dark: '140 29 24' },
      onErrorContainer: { light: '65 14 11', dark: '249 222 220' },

      background: { light: '254 247 255', dark: '20 18 24' },
      onBackground: { light: '29 27 32', dark: '230 224 233' },

      surface: { light: '254 247 255', dark: '20 18 24' },
      onSurface: { light: '29 27 32', dark: '230 224 233' },
      surfaceVariant: { light: '231 224 236', dark: '73 69 79' },
      onSurfaceVariant: { light: '73 69 79', dark: '202 196 208' },

      surfaceDim: { light: '222 216 225', dark: '20 18 24' },
      surfaceBright: { light: '254 247 255', dark: '59 56 62' },
      surfaceContainerLowest: { light: '255 255 255', dark: '15 13 19' },
      surfaceContainerLow: { light: '247 242 250', dark: '29 27 32' },
      surfaceContainer: { light: '243 237 247', dark: '33 31 38' },
      surfaceContainerHigh: { light: '236 230 240', dark: '43 41 48' },
      surfaceContainerHighest: { light: '230 224 233', dark: '54 52 59' },

      outline: { light: '121 116 126', dark: '147 143 153' },
      outlineVariant: { light: '202 196 208', dark: '73 69 79' },

      shadow: { light: '0 0 0', dark: '0 0 0' },
      scrim: { light: '0 0 0', dark: '0 0 0' },
      surfaceTint: { light: '103 80 164', dark: '208 188 255' },

      inverseSurface: { light: '50 47 53', dark: '230 224 233' },
      inverseOnSurface: { light: '245 239 247', dark: '50 47 53' },
      inversePrimary: { light: '208 188 255', dark: '103 80 164' },

      // Fixed roles — identical in light & dark.
      primaryFixed: { light: '234 221 255', dark: '234 221 255' },
      primaryFixedDim: { light: '208 188 255', dark: '208 188 255' },
      onPrimaryFixed: { light: '33 0 93', dark: '33 0 93' },
      onPrimaryFixedVariant: { light: '79 55 139', dark: '79 55 139' },
      secondaryFixed: { light: '232 222 248', dark: '232 222 248' },
      secondaryFixedDim: { light: '204 194 220', dark: '204 194 220' },
      onSecondaryFixed: { light: '29 25 43', dark: '29 25 43' },
      onSecondaryFixedVariant: { light: '74 68 88', dark: '74 68 88' },
      tertiaryFixed: { light: '255 216 228', dark: '255 216 228' },
      tertiaryFixedDim: { light: '239 184 200', dark: '239 184 200' },
      onTertiaryFixed: { light: '49 17 29', dark: '49 17 29' },
      onTertiaryFixedVariant: { light: '99 59 72', dark: '99 59 72' },
    },

    /** System typescale — 15 roles. */
    typescale: {
      displayLarge: { fontFamily: BRAND, fontWeight: '400', fontSize: '57px', lineHeight: '64px', letterSpacing: '-0.25px' },
      displayMedium: { fontFamily: BRAND, fontWeight: '400', fontSize: '45px', lineHeight: '52px', letterSpacing: '0px' },
      displaySmall: { fontFamily: BRAND, fontWeight: '400', fontSize: '36px', lineHeight: '44px', letterSpacing: '0px' },
      headlineLarge: { fontFamily: BRAND, fontWeight: '400', fontSize: '32px', lineHeight: '40px', letterSpacing: '0px' },
      headlineMedium: { fontFamily: BRAND, fontWeight: '400', fontSize: '28px', lineHeight: '36px', letterSpacing: '0px' },
      headlineSmall: { fontFamily: BRAND, fontWeight: '400', fontSize: '24px', lineHeight: '32px', letterSpacing: '0px' },
      titleLarge: { fontFamily: PLAIN, fontWeight: '400', fontSize: '22px', lineHeight: '28px', letterSpacing: '0px' },
      titleMedium: { fontFamily: PLAIN, fontWeight: '500', fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px' },
      titleSmall: { fontFamily: PLAIN, fontWeight: '500', fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px' },
      bodyLarge: { fontFamily: PLAIN, fontWeight: '400', fontSize: '16px', lineHeight: '24px', letterSpacing: '0.5px' },
      bodyMedium: { fontFamily: PLAIN, fontWeight: '400', fontSize: '14px', lineHeight: '20px', letterSpacing: '0.25px' },
      bodySmall: { fontFamily: PLAIN, fontWeight: '400', fontSize: '12px', lineHeight: '16px', letterSpacing: '0.4px' },
      labelLarge: { fontFamily: PLAIN, fontWeight: '500', fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px' },
      labelMedium: { fontFamily: PLAIN, fontWeight: '500', fontSize: '12px', lineHeight: '16px', letterSpacing: '0.5px' },
      labelSmall: { fontFamily: PLAIN, fontWeight: '500', fontSize: '11px', lineHeight: '16px', letterSpacing: '0.5px' },
    },

    /** System shape — corner scale. */
    shape: {
      none: '0px',
      extraSmall: '4px',
      small: '8px',
      medium: '12px',
      large: '16px',
      extraLarge: '28px',
      full: '9999px',
    },

    /**
     * System elevation — box-shadow per level. The M3 elevation model also adds
     * a surface-tint overlay; the tint is applied by component styling using
     * `--md-sys-color-surface-tint`. Shadows here are the box-shadow half.
     */
    elevation: {
      level0: 'none',
      level1: '0px 1px 2px 0px rgb(0 0 0 / 0.30), 0px 1px 3px 1px rgb(0 0 0 / 0.15)',
      level2: '0px 1px 2px 0px rgb(0 0 0 / 0.30), 0px 2px 6px 2px rgb(0 0 0 / 0.15)',
      level3: '0px 1px 3px 0px rgb(0 0 0 / 0.30), 0px 4px 8px 3px rgb(0 0 0 / 0.15)',
      level4: '0px 2px 3px 0px rgb(0 0 0 / 0.30), 0px 6px 10px 4px rgb(0 0 0 / 0.15)',
      level5: '0px 4px 4px 0px rgb(0 0 0 / 0.30), 0px 8px 12px 6px rgb(0 0 0 / 0.15)',
    },

    /** System state — state-layer opacities. */
    state: {
      hover: '0.08',
      focus: '0.10',
      pressed: '0.10',
      dragged: '0.16',
    },

    /** System motion — easing curves & durations. */
    motion: {
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
        standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
        emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      },
      duration: {
        short1: '50ms',
        short2: '100ms',
        short3: '150ms',
        short4: '200ms',
        medium1: '250ms',
        medium2: '300ms',
        medium3: '350ms',
        medium4: '400ms',
        long1: '450ms',
        long2: '500ms',
        long3: '550ms',
        long4: '600ms',
        extraLong1: '700ms',
        extraLong2: '800ms',
        extraLong3: '900ms',
        extraLong4: '1000ms',
      },
    },
  },
} as const satisfies Tokens;

export type AppTokens = typeof tokens;
