'use client';
/**
 * create-menu.tsx — headless M3 Menu parts.
 *
 * Base UI Menu composition exposed as a namespace. The Popup is the M3 menu
 * surface; each Item gets a ripple + state layer (driven by data-highlighted).
 */
import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import type { MenuClasses } from './menu.contract';
import { createSlot } from './slot';

export function createMenu(classes: MenuClasses) {
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
  };
}
