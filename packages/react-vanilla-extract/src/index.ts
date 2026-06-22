/**
 * @m3/react-vanilla-extract — M3 components, vanilla-extract build.
 *
 * Re-exports the shared theme primitives from @m3/core so consumers import
 * everything from one package.
 */
export { Button } from './button';
export type { ButtonProps, ButtonVariant } from './button';

export {
  ThemeProvider,
  useTheme,
  Ripple,
  generateScheme,
  applyScheme,
  schemeToCssText,
  type ThemeMode,
  type ThemeProviderProps,
  type SchemeVariant,
  type ContrastLevel,
} from '@m3/core';
