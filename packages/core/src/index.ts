/**
 * @m3-baseui/core — engine-neutral logic shared by every styling-engine package.
 */

// Component factories
export { createButton } from './components/button';
export { createIconButton } from './components/icon-button';
export { createSwitch } from './components/switch';
export { createCheckbox } from './components/checkbox';
export { createRadio, createRadioGroup } from './components/radio';
export { createChip } from './components/chip';
export { createTooltip } from './components/tooltip';
export { createRichTooltip } from './components/tooltip';
export { createDialog } from './components/dialog';
export { createMenu } from './components/menu';
export { createTabs } from './components/tabs';
export { createSlider } from './components/slider';
export { createSelect } from './components/select';
export { createTextField } from './components/textfield';
export { createNavigationBar } from './components/navigation-bar';
export { createFab } from './components/fab';
export { createFabMenu } from './components/fab-menu';
export type { FabMenuTriggerProps, FabMenuItemProps } from './components/fab-menu';
export { createDivider } from './components/divider';
export { createProgress } from './components/progress';
export { createLoadingIndicator } from './components/loading-indicator';
export { createList } from './components/list';
export { createSnackbar, useSnackbar } from './components/snackbar';
export { createItem } from './components/item';
export { createBadge } from './components/badge';
export { createCard } from './components/card';
export { createSegmentedButton } from './components/segmented-button';
export { createButtonGroup } from './components/button-group';
export {
  createSplitButton,
  type SplitButtonGroupProps,
  type SplitButtonLeadingProps,
  type SplitButtonTrailingProps,
} from './components/split-button';
export { createNavigationDrawer } from './components/navigation-drawer';
export { createTopAppBar } from './components/top-app-bar';
export { createBottomAppBar } from './components/bottom-app-bar';
export { createNavigationRail } from './components/navigation-rail';
export { createBottomSheet } from './components/bottom-sheet';
export { createSideSheet } from './components/side-sheet';
export { createSearch } from './components/search';
export { createDatePicker, type CalendarProps } from './components/date-picker';
export { createTimePicker } from './components/time-picker';
export { createToolbar } from './components/toolbar';
export { createCarousel } from './components/carousel';

// Contracts (variant sets + prop types, defined once)
export type { SearchClasses } from './components/search';
export type { DatePickerClasses } from './components/date-picker';
export {
  TIME_PICKER_VARIANTS,
  type TimePickerVariant,
  type TimeValue,
  type TimePickerOwnProps,
  type TimePickerClasses,
  type TimePickerResolverArgs,
  type TimePickerClassResolver,
} from './components/time-picker';
export {
  BUTTON_VARIANTS,
  type ButtonVariant,
  type ButtonOwnProps,
  type ButtonProps,
  type ButtonResolverArgs,
  type ButtonClassResolver,
} from './components/button';
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
} from './components/icon-button';
export type { SwitchClasses, SwitchIcons } from './components/switch';
export type { CheckboxClasses } from './components/checkbox';
export type { RadioClasses } from './components/radio';
export {
  CHIP_VARIANTS,
  type ChipVariant,
  type ChipOwnProps,
  type ChipProps,
  type ChipResolverArgs,
  type ChipSlotClasses,
  type ChipClassResolver,
} from './components/chip';
export type { TooltipClasses, RichTooltipClasses } from './components/tooltip';
export type {
  DialogClasses,
  DialogPopupOwnProps,
  DialogPopupResolverArgs,
} from './components/dialog';
export type { MenuClasses } from './components/menu';
export {
  TABS_VARIANTS,
  type TabsVariant,
  type TabsSlotClasses,
  type TabsClassResolver,
} from './components/tabs';
export type {
  SliderClasses,
  SliderTickListProps,
  SliderValueLabelProps,
} from './components/slider';
export type { SelectClasses } from './components/select';
export {
  TEXT_FIELD_VARIANTS,
  type TextFieldVariant,
  type TextFieldOwnProps,
  type TextFieldProps,
  type TextFieldResolverArgs,
  type TextFieldSlotClasses,
  type TextFieldClassResolver,
} from './components/textfield';
export type { NavigationBarClasses } from './components/navigation-bar';
export {
  FAB_SIZES,
  FAB_COLORS,
  type FabSize,
  type FabColor,
  type FabOwnProps,
  type FabProps,
  type FabResolverArgs,
  type FabClassResolver,
} from './components/fab';
export type { FabMenuClasses } from './components/fab-menu';
export type { SnackbarClasses } from './components/snackbar';
export {
  DIVIDER_INSETS,
  DIVIDER_ORIENTATIONS,
  type DividerInset,
  type DividerOrientation,
  type DividerOwnProps,
  type DividerProps,
  type DividerResolverArgs,
  type DividerClassResolver,
} from './components/divider';
export type {
  ProgressSlotClasses,
  ProgressClasses,
  LinearProgressOwnProps,
  LinearProgressProps,
  CircularProgressOwnProps,
  CircularProgressProps,
} from './components/progress';
export type {
  LoadingIndicatorSlotClasses,
  LoadingIndicatorResolverArgs,
  LoadingIndicatorClassResolver,
  LoadingIndicatorOwnProps,
  LoadingIndicatorProps,
} from './components/loading-indicator';
export {
  LIST_ITEM_LINES,
  type ListItemLines,
  LIST_LEADING_VARIANTS,
  type ListLeadingVariant,
  type ListItemResolverArgs,
  type ListItemSlotClasses,
  type ListClasses,
  type ListItemOwnProps,
  type ListItemProps,
} from './components/list';
export {
  ITEM_LEADING_VARIANTS,
  type ItemLeadingVariant,
  type ItemClasses,
  type ItemOwnProps,
  type ItemProps,
} from './components/item';
export {
  BADGE_SIZES,
  type BadgeSize,
  type BadgeResolverArgs,
  type BadgeClasses,
  type BadgeOwnProps,
  type BadgeProps,
} from './components/badge';
export {
  CARD_VARIANTS,
  type CardVariant,
  type CardResolverArgs,
  type CardClasses,
  type CardOwnProps,
  type CardProps,
} from './components/card';
export type {
  SegmentedButtonClasses,
  SegmentedButtonItemOwnProps,
} from './components/segmented-button';
export {
  BUTTON_GROUP_VARIANTS,
  type ButtonGroupVariant,
  type ButtonGroupResolverArgs,
  type ButtonGroupClassResolver,
  type ButtonGroupOwnProps,
  type ButtonGroupProps,
} from './components/button-group';
export type {
  SplitButtonClasses,
  SplitButtonGroupOwnProps,
  SplitButtonLeadingOwnProps,
  SplitButtonTrailingOwnProps,
} from './components/split-button';
export {
  NAV_DRAWER_VARIANTS,
  type NavigationDrawerVariant,
  type NavigationDrawerResolverArgs,
  type NavigationDrawerClasses,
  type NavigationDrawerOwnProps,
  type NavigationDrawerItemOwnProps,
} from './components/navigation-drawer';
export {
  TOP_APP_BAR_VARIANTS,
  type TopAppBarVariant,
  type TopAppBarSlots,
  type TopAppBarResolverArgs,
  type TopAppBarClassResolver,
  type TopAppBarOwnProps,
  type TopAppBarProps,
} from './components/top-app-bar';
export type {
  BottomAppBarClasses,
  BottomAppBarOwnProps,
  BottomAppBarProps,
} from './components/bottom-app-bar';
export type { NavigationRailClasses } from './components/navigation-rail';
export {
  BOTTOM_SHEET_VARIANTS,
  type BottomSheetVariant,
  type BottomSheetClasses,
  type BottomSheetOwnProps,
} from './components/bottom-sheet';
export {
  SIDE_SHEET_VARIANTS,
  SIDE_SHEET_SIDES,
  type SideSheetVariant,
  type SideSheetSide,
  type SideSheetResolverArgs,
  type SideSheetClasses,
  type SideSheetOwnProps,
} from './components/side-sheet';
export {
  TOOLBAR_VARIANTS,
  TOOLBAR_ORIENTATIONS,
  type ToolbarVariant,
  type ToolbarOrientation,
  type ToolbarResolverArgs,
  type ToolbarClassResolver,
  type ToolbarOwnProps,
  type ToolbarProps,
} from './components/toolbar';
export {
  CAROUSEL_VARIANTS,
  type CarouselVariant,
  type CarouselSlotClasses,
  type CarouselClassResolver,
} from './components/carousel';

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
