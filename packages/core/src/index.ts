/**
 * @m3/core — engine-neutral logic shared by every styling-engine package.
 */

// Component factories
export { createButton } from './create-button';

// Contracts (variant sets + prop types, defined once)
export {
  BUTTON_VARIANTS,
  type ButtonVariant,
  type ButtonOwnProps,
  type ButtonProps,
  type ButtonResolverArgs,
  type ButtonClassResolver,
} from './button.contract';

// Theme & dynamic color
export {
  ThemeProvider,
  useTheme,
  type ThemeMode,
  type ThemeProviderProps,
  type ThemeContextValue,
} from './theme/ThemeProvider';
export {
  generateScheme,
  applyScheme,
  schemeToCssText,
  type SchemeVariant,
  type ContrastLevel,
  type Scheme,
  type SchemePair,
  type ColorRole,
} from './theme/dynamic-color';

// Primitives
export { Ripple, type RippleProps } from './ripple/Ripple';

// Utils
export { cx, mergeRefs } from './utils';
