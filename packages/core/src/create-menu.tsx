'use client';
/**
 * create-menu.tsx — headless M3 Menu parts.
 *
 * Base UI Menu composition exposed as a namespace. The Popup is the M3 menu
 * surface; each Item gets a ripple + state layer (driven by data-highlighted).
 * Selectable (checkbox/radio) items and submenus reuse the same surface and
 * state-layer treatment; the leading check/dot indicator sits in a 24dp column.
 */
import type * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import type { MenuClasses } from './menu.contract';
import { createSlot } from './slot';

/** Default leading checkmark for selectable menu items. */
function MenuCheck(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

/**
 * Build the M3 Menu namespace (Root, Popup, Item, submenu, selectable items)
 * bound to one engine's slot classes.
 *
 * @param classes - Engine-resolved class strings for each menu slot.
 * @returns A namespace of Base UI menu parts wrapped with M3 styling + ripple.
 */
export function createMenu(classes: MenuClasses) {
  const CheckboxItemIndicator = createSlot(
    MenuPrimitive.CheckboxItemIndicator,
    classes.itemIndicator,
    { defaultProps: { keepMounted: true } },
  );
  const RadioItemIndicator = createSlot(MenuPrimitive.RadioItemIndicator, classes.itemIndicator, {
    defaultProps: { keepMounted: true },
  });

  return {
    Root: MenuPrimitive.Root,
    Trigger: MenuPrimitive.Trigger,
    Portal: MenuPrimitive.Portal,
    Positioner: MenuPrimitive.Positioner,
    Popup: createSlot(MenuPrimitive.Popup, classes.popup),
    Item: createSlot(MenuPrimitive.Item, classes.item, { ripple: true }),
    Separator: createSlot(MenuPrimitive.Separator, classes.separator),
    Group: MenuPrimitive.Group,
    GroupLabel: createSlot(MenuPrimitive.GroupLabel, classes.groupLabel),
    // Submenu: SubmenuRoot is a context provider; the trigger looks like an item
    // with a trailing chevron and stays highlighted while its submenu is open.
    SubmenuRoot: MenuPrimitive.SubmenuRoot,
    SubmenuTrigger: createSlot(MenuPrimitive.SubmenuTrigger, classes.submenuTrigger, {
      ripple: true,
    }),
    // Selectable items (single + multi select).
    RadioGroup: MenuPrimitive.RadioGroup,
    CheckboxItem: createSlot(MenuPrimitive.CheckboxItem, classes.checkboxItem, { ripple: true }),
    RadioItem: createSlot(MenuPrimitive.RadioItem, classes.radioItem, { ripple: true }),
    CheckboxItemIndicator,
    RadioItemIndicator,
    /** Default leading checkmark glyph for use inside the indicators. */
    Check: MenuCheck,
  };
}
