'use client';
/**
 * create-select.tsx — headless M3 Select parts.
 *
 * Base UI Select composition exposed as a namespace. The Trigger is styled as an
 * M3 outlined field; the Popup reuses the M3 menu surface; each Item gets a
 * state layer + ripple and a leading ItemIndicator (check).
 */
import { Select as SelectPrimitive } from '@base-ui/react/select';

import type { SelectClasses } from './select.contract';
import { createSlot } from './slot';

export function createSelect(classes: SelectClasses) {
  return {
    Root: SelectPrimitive.Root,
    Trigger: createSlot(SelectPrimitive.Trigger, classes.trigger),
    Value: createSlot(SelectPrimitive.Value, classes.value),
    Icon: createSlot(SelectPrimitive.Icon, classes.icon),
    Portal: SelectPrimitive.Portal,
    Positioner: SelectPrimitive.Positioner,
    Popup: createSlot(SelectPrimitive.Popup, classes.popup),
    List: SelectPrimitive.List,
    Item: createSlot(SelectPrimitive.Item, classes.item, { ripple: true }),
    ItemText: SelectPrimitive.ItemText,
    ItemIndicator: createSlot(SelectPrimitive.ItemIndicator, classes.itemIndicator),
    Group: SelectPrimitive.Group,
    GroupLabel: createSlot(SelectPrimitive.GroupLabel, classes.groupLabel),
  };
}
