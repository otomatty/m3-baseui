/**
 * @otomatty/core — engine-neutral logic shared by every styling-engine package.
 */

// Component factories
export { createButton } from './create-button';
export { createIconButton } from './create-icon-button';
export { createSwitch } from './create-switch';
export { createCheckbox } from './create-checkbox';
export { createRadio, createRadioGroup } from './create-radio';
export { createChip } from './create-chip';
export { createTooltip } from './create-tooltip';
export { createDialog } from './create-dialog';
export { createMenu } from './create-menu';
export { createTabs } from './create-tabs';
export { createSlider } from './create-slider';
export { createSelect } from './create-select';
export { createTextField } from './create-textfield';
export { createNavigationBar } from './create-navigation-bar';
export { createFab } from './create-fab';
export { createDivider } from './create-divider';
export { createProgress } from './create-progress';
export { createList } from './create-list';
export { createSnackbar, useSnackbar } from './create-snackbar';
export { createItem } from './create-item';
export { createBadge } from './create-badge';
export { createCard } from './create-card';
export { createSegmentedButton } from './create-segmented-button';
export { createNavigationDrawer } from './create-navigation-drawer';

// Contracts (variant sets + prop types, defined once)
export {
  BUTTON_VARIANTS,
  type ButtonVariant,
  type ButtonOwnProps,
  type ButtonProps,
  type ButtonResolverArgs,
  type ButtonClassResolver,
} from './button.contract';
export {
  ICON_BUTTON_VARIANTS,
  ICON_BUTTON_SIZES,
  ICON_BUTTON_WIDTHS,
  type IconButtonVariant,
  type IconButtonSize,
  type IconButtonWidth,
  type IconButtonOwnProps,
  type IconButtonProps,
  type IconButtonResolverArgs,
  type IconButtonClassResolver,
} from './icon-button.contract';
export type { SwitchClasses, SwitchIcons } from './switch.contract';
export type { CheckboxClasses } from './checkbox.contract';
export type { RadioClasses } from './radio.contract';
export {
  CHIP_VARIANTS,
  type ChipVariant,
  type ChipOwnProps,
  type ChipProps,
  type ChipResolverArgs,
  type ChipSlotClasses,
  type ChipClassResolver,
} from './chip.contract';
export type { TooltipClasses } from './tooltip.contract';
export type { DialogClasses } from './dialog.contract';
export type { MenuClasses } from './menu.contract';
export {
  TABS_VARIANTS,
  type TabsVariant,
  type TabsSlotClasses,
  type TabsClassResolver,
} from './tabs.contract';
export type { SliderClasses } from './slider.contract';
export type { SelectClasses } from './select.contract';
export {
  TEXT_FIELD_VARIANTS,
  type TextFieldVariant,
  type TextFieldOwnProps,
  type TextFieldProps,
  type TextFieldResolverArgs,
  type TextFieldSlotClasses,
  type TextFieldClassResolver,
} from './textfield.contract';
export type { NavigationBarClasses } from './navigation-bar.contract';
export {
  FAB_SIZES,
  FAB_COLORS,
  type FabSize,
  type FabColor,
  type FabOwnProps,
  type FabProps,
  type FabResolverArgs,
  type FabClassResolver,
} from './fab.contract';
export type { SnackbarClasses } from './snackbar.contract';
export {
  DIVIDER_INSETS,
  DIVIDER_ORIENTATIONS,
  type DividerInset,
  type DividerOrientation,
  type DividerOwnProps,
  type DividerProps,
  type DividerResolverArgs,
  type DividerClassResolver,
} from './divider.contract';
export type {
  ProgressSlotClasses,
  ProgressClasses,
  LinearProgressOwnProps,
  LinearProgressProps,
  CircularProgressOwnProps,
  CircularProgressProps,
} from './progress.contract';
export {
  LIST_ITEM_LINES,
  type ListItemLines,
  type ListItemResolverArgs,
  type ListItemSlotClasses,
  type ListClasses,
  type ListItemOwnProps,
  type ListItemProps,
} from './list.contract';
export type { ItemClasses, ItemOwnProps, ItemProps } from './item.contract';
export {
  BADGE_SIZES,
  type BadgeSize,
  type BadgeResolverArgs,
  type BadgeClasses,
  type BadgeOwnProps,
  type BadgeProps,
} from './badge.contract';
export {
  CARD_VARIANTS,
  type CardVariant,
  type CardResolverArgs,
  type CardClasses,
  type CardOwnProps,
  type CardProps,
} from './card.contract';
export type {
  SegmentedButtonClasses,
  SegmentedButtonItemOwnProps,
} from './segmented-button.contract';
export {
  NAV_DRAWER_VARIANTS,
  type NavigationDrawerVariant,
  type NavigationDrawerResolverArgs,
  type NavigationDrawerClasses,
  type NavigationDrawerOwnProps,
  type NavigationDrawerItemOwnProps,
} from './navigation-drawer.contract';

// Slot helpers (for engine packages composing Base UI parts)
export { createSlot, mergeClassName, type ClassValue, type SlotOptions } from './slot';

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
