/**
 * @m3/core — engine-neutral logic shared by every styling-engine package.
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
  type IconButtonVariant,
  type IconButtonOwnProps,
  type IconButtonProps,
  type IconButtonResolverArgs,
  type IconButtonClassResolver,
} from './icon-button.contract';
export { type SwitchClasses } from './switch.contract';
export { type CheckboxClasses } from './checkbox.contract';
export { type RadioClasses } from './radio.contract';
export {
  CHIP_VARIANTS,
  type ChipVariant,
  type ChipOwnProps,
  type ChipProps,
  type ChipResolverArgs,
  type ChipSlotClasses,
  type ChipClassResolver,
} from './chip.contract';
export { type TooltipClasses } from './tooltip.contract';
export { type DialogClasses } from './dialog.contract';
export { type MenuClasses } from './menu.contract';
export {
  TABS_VARIANTS,
  type TabsVariant,
  type TabsSlotClasses,
  type TabsClassResolver,
} from './tabs.contract';
export { type SliderClasses } from './slider.contract';
export { type SelectClasses } from './select.contract';

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
