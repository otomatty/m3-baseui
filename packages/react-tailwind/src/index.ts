/**
 * @otomatty/react-tailwind — M3 components, Tailwind v4 build.
 */
export { Button, button } from './button';
export type { ButtonProps, ButtonVariant } from './button';

export { IconButton, iconButton } from './icon-button';
export type { IconButtonProps, IconButtonVariant } from './icon-button';

export { Switch, switchTv } from './switch';
export { Checkbox, checkboxTv } from './checkbox';
export { Radio, RadioGroup, radioTv } from './radio';

export { Chip, chipTv } from './chip';
export type { ChipProps, ChipVariant } from './chip';

export { Tooltip, tooltipTv } from './tooltip';
export { Dialog, dialogTv } from './dialog';
export { Menu, menuTv } from './menu';
export { Tabs, tabsTv } from './tabs';
export type { TabsVariant } from './tabs';
export { Slider, sliderTv } from './slider';
export { Select, selectTv } from './select';

export { TextField, textFieldTv } from './textfield';
export type { TextFieldProps, TextFieldVariant } from './textfield';
export { NavigationBar, navigationBarTv } from './navigation-bar';
export { Fab, fabTv } from './fab';
export type { FabProps, FabSize, FabColor } from './fab';
export { Divider, dividerTv } from './divider';
export type { DividerProps, DividerInset, DividerOrientation } from './divider';
export { Progress, linearTv, circularTv } from './progress';
export type { LinearProgressProps, CircularProgressProps } from './progress';
export { List, listTv } from './list';
export type { ListItemProps, ListItemLines } from './list';
export { Snackbar, snackbarTv, useSnackbar } from './snackbar';
export { Item, itemTv } from './item';
export type { ItemProps } from './item';
export { Badge, badgeTv } from './badge';
export type { BadgeProps, BadgeSize } from './badge';
export { Card, cardTv } from './card';
export type { CardProps, CardVariant } from './card';
export { SegmentedButton, segmentedButtonTv } from './segmented-button';
export { NavigationDrawer, navigationDrawerTv } from './navigation-drawer';
export type { NavigationDrawerVariant } from './navigation-drawer';

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
} from '@otomatty/core';
