'use client';
/**
 * create-snackbar.tsx — headless M3 Snackbar parts.
 *
 * Base UI Toast composition exposed as a namespace. Provider/Portal are
 * behavior-only; Viewport, Root, Title, Description, Action and Close carry the
 * M3 classes. Enqueue toasts with `useSnackbar` (re-export of `useToastManager`).
 */
import type * as React from 'react';
import { Toast } from '@base-ui/react/toast';

import type { SnackbarClasses } from './snackbar.contract';
import { createSlot } from './slot';

/** Enqueue and manage snackbars (re-export of Base UI's `useToastManager`). */
export const useSnackbar = Toast.useToastManager;

// Toast.Portal's inferred type references an internal (non-portable) module, so
// pin it to a hand-written, portable props type for the emitted declarations.
type PortalProps = { children?: React.ReactNode; container?: HTMLElement | null };
const Portal = Toast.Portal as unknown as React.ComponentType<PortalProps>;

export function createSnackbar(classes: SnackbarClasses) {
  return {
    Provider: Toast.Provider,
    Portal,
    Viewport: createSlot(Toast.Viewport, classes.viewport),
    Root: createSlot(Toast.Root, classes.root),
    Content: createSlot(Toast.Content, classes.content),
    Title: createSlot(Toast.Title, classes.title),
    Description: createSlot(Toast.Description, classes.description),
    // No ripple child here: Toast.Action falls back to `toast.actionProps.children`
    // only when it receives no children, and an injected ripple would suppress that
    // (blanking the label). The `::before` state layer still gives press feedback.
    Action: createSlot(Toast.Action, classes.action),
    Close: createSlot(Toast.Close, classes.close),
  };
}
