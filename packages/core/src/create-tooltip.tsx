'use client';
/**
 * create-tooltip.tsx — headless M3 plain Tooltip parts.
 *
 * Returns the Base UI Tooltip composition as a namespace (low-level parts, per
 * the design's 2-level export). Behavior-only parts (Provider/Root/Trigger/
 * Portal/Positioner) are re-exported as-is; the visible Popup and Arrow are
 * wrapped with the engine's M3 classes.
 *
 * The plain tooltip is visual-only (hover/focus, no interactive content). The
 * rich tooltip — which holds buttons — lives in `create-rich-tooltip.tsx` on the
 * accessible Popover primitive instead.
 */
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import type { TooltipClasses } from './tooltip.contract';
import { createSlot } from './slot';

export function createTooltip(classes: TooltipClasses) {
  return {
    Provider: TooltipPrimitive.Provider,
    Root: TooltipPrimitive.Root,
    Trigger: TooltipPrimitive.Trigger,
    Portal: TooltipPrimitive.Portal,
    Positioner: TooltipPrimitive.Positioner,
    Popup: createSlot(TooltipPrimitive.Popup, classes.popup),
    Arrow: createSlot(TooltipPrimitive.Arrow, classes.arrow),
  };
}
