'use client';
/**
 * create-select.tsx — headless M3 Select parts.
 *
 * Base UI Select composition exposed as a namespace. The Trigger is styled as an
 * M3 outlined field; the Popup reuses the M3 menu surface; each Item gets a
 * state layer + ripple and a leading ItemIndicator (check). Scroll arrows are
 * sticky affordances shown at the popup edges when the list overflows.
 */
import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';

import type { SelectClasses } from './select.contract';
import { createSlot, mergeClassName, type ClassValue } from './slot';

/** Default chevron glyphs for the scroll arrows. */
function Chevron({ up }: { up?: boolean }): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d={up ? 'M7 14l5-5 5 5z' : 'M7 10l5 5 5-5z'} />
    </svg>
  );
}

type ScrollUpProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpArrow>;
type ScrollDownProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownArrow>;

export function createSelect(classes: SelectClasses) {
  // Scroll arrows carry a default chevron when the caller supplies no children.
  const ScrollUpArrow = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpArrow>,
    ScrollUpProps
  >(function ScrollUpArrow({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.ScrollUpArrow
        ref={ref}
        className={mergeClassName(classes.scrollUpArrow, className as ClassValue)}
        {...props}
      >
        {children ?? <Chevron up />}
      </SelectPrimitive.ScrollUpArrow>
    );
  });
  ScrollUpArrow.displayName = 'M3Select.ScrollUpArrow';

  const ScrollDownArrow = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownArrow>,
    ScrollDownProps
  >(function ScrollDownArrow({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.ScrollDownArrow
        ref={ref}
        className={mergeClassName(classes.scrollDownArrow, className as ClassValue)}
        {...props}
      >
        {children ?? <Chevron />}
      </SelectPrimitive.ScrollDownArrow>
    );
  });
  ScrollDownArrow.displayName = 'M3Select.ScrollDownArrow';

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
    // keepMounted so the 24px indicator column stays populated on every item
    // (labels align); the check glyph is hidden via CSS unless the item is selected.
    ItemIndicator: createSlot(SelectPrimitive.ItemIndicator, classes.itemIndicator, {
      defaultProps: { keepMounted: true },
    }),
    ScrollUpArrow,
    ScrollDownArrow,
    Group: SelectPrimitive.Group,
    GroupLabel: createSlot(SelectPrimitive.GroupLabel, classes.groupLabel),
  };
}
