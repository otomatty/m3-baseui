'use client';
/**
 * create-tooltip.tsx — headless M3 Tooltip parts (plain + rich).
 *
 * Returns the Base UI Tooltip composition as a namespace (low-level parts, per
 * the design's 2-level export). Behavior-only parts (Provider/Root/Trigger/
 * Portal/Positioner) are re-exported as-is; the visible Popup and Arrow are
 * wrapped with the engine's M3 classes.
 *
 * The rich tooltip reuses the same behavior parts (hoverable popup by default)
 * and swaps in `RichPopup`, a surface-container surface that holds an optional
 * `Subhead`, `SupportingText`, and a trailing `Actions` row. Those three are
 * plain elements, identical across engines.
 */
import * as React from 'react';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import type { TooltipClasses } from './tooltip.contract';
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

export function createTooltip(classes: TooltipClasses) {
  return {
    Provider: TooltipPrimitive.Provider,
    Root: TooltipPrimitive.Root,
    Trigger: TooltipPrimitive.Trigger,
    Portal: TooltipPrimitive.Portal,
    Positioner: TooltipPrimitive.Positioner,
    Popup: createSlot(TooltipPrimitive.Popup, classes.popup),
    Arrow: createSlot(TooltipPrimitive.Arrow, classes.arrow),
    // Rich tooltip parts.
    RichPopup: createSlot(TooltipPrimitive.Popup, classes.richPopup),
    Subhead: createDivSlot(classes.subhead, 'M3Tooltip.Subhead'),
    SupportingText: createDivSlot(classes.supportingText, 'M3Tooltip.SupportingText'),
    Actions: createDivSlot(classes.actions, 'M3Tooltip.Actions'),
  };
}
