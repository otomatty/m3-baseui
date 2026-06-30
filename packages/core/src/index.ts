/**
 * @m3-baseui/core — engine-neutral logic shared by every styling-engine package.
 */

// Component factories
export { createButton } from './create-button';
export { createIconButton } from './create-icon-button';
export { createSwitch } from './create-switch';
export { createCheckbox } from './create-checkbox';
export { createRadio, createRadioGroup } from './create-radio';
export { createChip } from './create-chip';
export { createTooltip } from './create-tooltip';
export { createRichTooltip } from './create-rich-tooltip';
export { createDialog } from './create-dialog';
export { createMenu } from './create-menu';
export { createTabs } from './create-tabs';
export { createSlider } from './create-slider';
export { createSelect } from './create-select';
export { createTextField } from './create-textfield';
export { createNavigationBar } from './create-navigation-bar';
export { createFab } from './create-fab';
export { createFabMenu } from './create-fab-menu';
export type { FabMenuTriggerProps, FabMenuItemProps } from './create-fab-menu';
export { createDivider } from './create-divider';
export { createProgress } from './create-progress';
export { createLoadingIndicator } from './create-loading-indicator';
export { createList } from './create-list';
export { createSnackbar, useSnackbar } from './create-snackbar';
export { createItem } from './create-item';
export { createBadge } from './create-badge';
export { createCard } from './create-card';
export { createSegmentedButton } from './create-segmented-button';
export { createButtonGroup } from './create-button-group';
export {
  createSplitButton,
  type SplitButtonGroupProps,
  type SplitButtonLeadingProps,
  type SplitButtonTrailingProps,
} from './create-split-button';
export { createNavigationDrawer } from './create-navigation-drawer';
export { createTopAppBar } from './create-top-app-bar';
export { createBottomAppBar } from './create-bottom-app-bar';
export { createNavigationRail } from './create-navigation-rail';
export { createBottomSheet } from './create-bottom-sheet';
export { createSideSheet } from './create-side-sheet';
export { createSearch } from './create-search';
export { createDatePicker, type CalendarProps } from './create-date-picker';
export { createTimePicker } from './create-time-picker';
export { createToolbar } from './create-toolbar';
export { createCarousel } from './create-carousel';

// Contracts (variant sets + prop types, defined once)
export type { SearchClasses } from './search.contract';
export type { DatePickerClasses } from './date-picker.contract';
export {
  TIME_PICKER_VARIANTS,
  type TimePickerVariant,
  type TimeValue,
  type TimePickerOwnProps,
  type TimePickerClasses,
  type TimePickerResolverArgs,
  type TimePickerClassResolver,
} from './time-picker.contract';
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
export type { TooltipClasses, RichTooltipClasses } from './tooltip.contract';
export type {
  DialogClasses,
  DialogPopupOwnProps,
  DialogPopupResolverArgs,
} from './dialog.contract';
export type { MenuClasses } from './menu.contract';
export {
  TABS_VARIANTS,
  type TabsVariant,
  type TabsSlotClasses,
  type TabsClassResolver,
} from './tabs.contract';
export type {
  SliderClasses,
  SliderTickListProps,
  SliderValueLabelProps,
} from './slider.contract';
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
export type { FabMenuClasses } from './fab-menu.contract';
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
export type {
  LoadingIndicatorSlotClasses,
  LoadingIndicatorResolverArgs,
  LoadingIndicatorClassResolver,
  LoadingIndicatorOwnProps,
  LoadingIndicatorProps,
} from './loading-indicator.contract';
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
  BUTTON_GROUP_VARIANTS,
  type ButtonGroupVariant,
  type ButtonGroupResolverArgs,
  type ButtonGroupClassResolver,
  type ButtonGroupOwnProps,
  type ButtonGroupProps,
} from './button-group.contract';
export type {
  SplitButtonClasses,
  SplitButtonGroupOwnProps,
  SplitButtonLeadingOwnProps,
  SplitButtonTrailingOwnProps,
} from './split-button.contract';
export {
  NAV_DRAWER_VARIANTS,
  type NavigationDrawerVariant,
  type NavigationDrawerResolverArgs,
  type NavigationDrawerClasses,
  type NavigationDrawerOwnProps,
  type NavigationDrawerItemOwnProps,
} from './navigation-drawer.contract';
export {
  TOP_APP_BAR_VARIANTS,
  type TopAppBarVariant,
  type TopAppBarSlots,
  type TopAppBarResolverArgs,
  type TopAppBarClassResolver,
  type TopAppBarOwnProps,
  type TopAppBarProps,
} from './top-app-bar.contract';
export type {
  BottomAppBarClasses,
  BottomAppBarOwnProps,
  BottomAppBarProps,
} from './bottom-app-bar.contract';
export type { NavigationRailClasses } from './navigation-rail.contract';
export {
  BOTTOM_SHEET_VARIANTS,
  type BottomSheetVariant,
  type BottomSheetClasses,
  type BottomSheetOwnProps,
} from './bottom-sheet.contract';
export {
  SIDE_SHEET_VARIANTS,
  SIDE_SHEET_SIDES,
  type SideSheetVariant,
  type SideSheetSide,
  type SideSheetResolverArgs,
  type SideSheetClasses,
  type SideSheetOwnProps,
} from './side-sheet.contract';
export {
  TOOLBAR_VARIANTS,
  TOOLBAR_ORIENTATIONS,
  type ToolbarVariant,
  type ToolbarOrientation,
  type ToolbarResolverArgs,
  type ToolbarClassResolver,
  type ToolbarOwnProps,
  type ToolbarProps,
} from './toolbar.contract';
export {
  CAROUSEL_VARIANTS,
  type CarouselVariant,
  type CarouselSlotClasses,
  type CarouselClassResolver,
} from './carousel.contract';

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
export { TouchTarget } from './touch-target';

// Utils
export { cx, mergeRefs } from './utils';
