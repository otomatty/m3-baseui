/**
 * @m3/react-vanilla-extract — M3 components, vanilla-extract build.
 *
 * Re-exports the shared theme primitives from @m3/core so consumers import
 * everything from one package.
 */
export { Button } from './button';
export type { ButtonProps, ButtonVariant } from './button';

export { IconButton } from './icon-button';
export type { IconButtonProps, IconButtonVariant } from './icon-button';

export { Switch } from './switch';
export { Checkbox } from './checkbox';
export { Radio, RadioGroup } from './radio';

export { Chip } from './chip';
export type { ChipProps, ChipVariant } from './chip';

export { Tooltip } from './tooltip';
export { Dialog } from './dialog';
export { Menu } from './menu';
export { Tabs } from './tabs';
export type { TabsVariant } from './tabs';
export { Slider } from './slider';
export { Select } from './select';

export { TextField } from './textfield';
export type { TextFieldProps, TextFieldVariant } from './textfield';
export { NavigationBar } from './navigation-bar';
export { Fab } from './fab';
export type { FabProps, FabSize, FabColor } from './fab';
export { Divider } from './divider';
export type { DividerProps, DividerInset, DividerOrientation } from './divider';
export { Progress } from './progress';
export type { LinearProgressProps, CircularProgressProps } from './progress';
export { List } from './list';
export type { ListItemProps, ListItemLines } from './list';
export { Snackbar, useSnackbar } from './snackbar';

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
