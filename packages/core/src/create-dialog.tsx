'use client';
/**
 * create-dialog.tsx — headless M3 Dialog parts.
 *
 * Base UI Dialog composition exposed as a namespace. Root/Trigger/Portal are
 * behavior-only; Backdrop (scrim), Popup (surface), Title, Description and Close
 * carry the M3 classes. Callers place action buttons inside the Popup.
 */
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

import type { DialogClasses } from './dialog.contract';
import { createSlot } from './slot';

export function createDialog(classes: DialogClasses) {
  return {
    Root: DialogPrimitive.Root,
    Trigger: DialogPrimitive.Trigger,
    Portal: DialogPrimitive.Portal,
    Backdrop: createSlot(DialogPrimitive.Backdrop, classes.backdrop),
    Popup: createSlot(DialogPrimitive.Popup, classes.popup),
    Title: createSlot(DialogPrimitive.Title, classes.title),
    Description: createSlot(DialogPrimitive.Description, classes.description),
    Close: createSlot(DialogPrimitive.Close, classes.close),
  };
}
