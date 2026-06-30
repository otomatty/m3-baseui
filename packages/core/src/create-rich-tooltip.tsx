'use client';
/**
 * create-rich-tooltip.tsx — headless M3 rich Tooltip parts.
 *
 * The M3 rich tooltip carries interactive controls (text-button actions), so it
 * is built on the Base UI **Popover** rather than the Tooltip primitive: Popover
 * opens on click/keyboard, manages focus, and works on touch — a plain tooltip
 * is visual-only (hover/focus, disabled on touch) and would leave those actions
 * unreachable for keyboard and touch users.
 *
 * Behavior-only parts (Root/Trigger/Portal/Positioner/Close) are re-exported as
 * is; the visible Popup and Arrow carry the engine's M3 classes. `Subhead` and
 * `SupportingText` use Popover's Title/Description so they also wire the popup's
 * accessible name and description. `Actions` is a plain row for the buttons.
 * Each engine injects only class strings, so the DOM + `data-*` stay identical.
 */
import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

import type { RichTooltipClasses } from './tooltip.contract';
import { createSlot } from './slot';
import { cx } from './utils';

/** A plain `<div>` part carrying a fixed M3 class merged with any caller class. */
function createDivSlot(baseClass: string, displayName: string) {
  const Slot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function Slot(
    { className, ...rest },
    ref,
  ) {
    return <div ref={ref} className={cx(baseClass, className)} {...rest} />;
  });
  Slot.displayName = displayName;
  return Slot;
}

export function createRichTooltip(classes: RichTooltipClasses) {
  return {
    Root: PopoverPrimitive.Root,
    Trigger: PopoverPrimitive.Trigger,
    Portal: PopoverPrimitive.Portal,
    Positioner: PopoverPrimitive.Positioner,
    Popup: createSlot(PopoverPrimitive.Popup, classes.popup),
    Arrow: createSlot(PopoverPrimitive.Arrow, classes.arrow),
    Subhead: createSlot(PopoverPrimitive.Title, classes.subhead),
    SupportingText: createSlot(PopoverPrimitive.Description, classes.supportingText),
    Actions: createDivSlot(classes.actions, 'M3RichTooltip.Actions'),
    Close: PopoverPrimitive.Close,
  };
}
