'use client';
/**
 * create-search.tsx — headless M3 Search parts.
 *
 * Base UI Combobox composition exposed as a namespace. The InputGroup is the
 * resting M3 search bar; the Popup is the docked search view that holds the
 * suggestion list. Each suggestion Item gets a ripple + state layer (driven by
 * data-highlighted / data-selected). Engines inject slot classes only, so the
 * DOM + `data-*` contract is identical between builds.
 */
import type * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';

import type { SearchClasses } from './search.contract';
import { createSlot } from './slot';

/** Default leading magnifier glyph for the search bar. */
function SearchIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14"
      />
    </svg>
  );
}

/** Default trailing check glyph for the selected suggestion. */
function CheckIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

/**
 * Build the M3 Search namespace (Root, Bar/Input/Icon/Clear, docked view with
 * suggestion List/Item) bound to one engine's slot classes.
 *
 * @param classes - Engine-resolved class strings for each search slot.
 * @returns A namespace of Base UI combobox parts wrapped with M3 styling + ripple.
 */
export function createSearch(classes: SearchClasses) {
  return {
    Root: ComboboxPrimitive.Root,
    Value: ComboboxPrimitive.Value,
    Label: ComboboxPrimitive.Label,
    /** The resting search bar (pill container). */
    Bar: createSlot(ComboboxPrimitive.InputGroup, classes.bar),
    Input: createSlot(ComboboxPrimitive.Input, classes.input),
    Trigger: ComboboxPrimitive.Trigger,
    Icon: createSlot(ComboboxPrimitive.Icon, classes.icon),
    Clear: createSlot(ComboboxPrimitive.Clear, classes.clear),
    Portal: ComboboxPrimitive.Portal,
    Positioner: ComboboxPrimitive.Positioner,
    Popup: createSlot(ComboboxPrimitive.Popup, classes.popup),
    List: createSlot(ComboboxPrimitive.List, classes.list),
    Item: createSlot(ComboboxPrimitive.Item, classes.item, { ripple: true }),
    ItemIndicator: createSlot(ComboboxPrimitive.ItemIndicator, classes.itemIndicator, {
      defaultProps: { keepMounted: true },
    }),
    Empty: createSlot(ComboboxPrimitive.Empty, classes.empty),
    Group: ComboboxPrimitive.Group,
    GroupLabel: createSlot(ComboboxPrimitive.GroupLabel, classes.groupLabel),
    Separator: createSlot(ComboboxPrimitive.Separator, classes.separator),
    Status: ComboboxPrimitive.Status,
    Collection: ComboboxPrimitive.Collection,
    /** Default leading magnifier glyph. */
    SearchGlyph: SearchIcon,
    /** Default trailing check glyph for the selected suggestion. */
    Check: CheckIcon,
  };
}
