'use client';
/**
 * create-bottom-sheet.tsx — headless M3 Bottom sheet parts.
 *
 * Base UI Drawer composition exposed as a namespace. `Root` fixes the swipe
 * direction to "down" and maps the M3 `variant` to the drawer's `modal` flag
 * (`standard` opts out of focus trap / scroll lock / scrim). Backdrop, Viewport,
 * Popup, Title and Description carry the M3 classes; `Handle` is a presentational
 * drag affordance. Each engine supplies the slot classes, so the DOM + `data-*`
 * (data-starting-style / data-ending-style / data-swiping / data-swipe-direction)
 * stay identical between builds.
 */
import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';

import type { BottomSheetClasses, BottomSheetOwnProps } from './bottom-sheet.contract';
import { createSlot } from './slot';
import { cx } from './utils';

type RootProps = BottomSheetOwnProps &
  Omit<React.ComponentProps<typeof DrawerPrimitive.Root>, 'swipeDirection' | 'modal'>;

export function createBottomSheet(classes: BottomSheetClasses) {
  function Root({ variant = 'modal', ...props }: RootProps): React.JSX.Element {
    return <DrawerPrimitive.Root swipeDirection="down" modal={variant !== 'standard'} {...props} />;
  }
  Root.displayName = 'M3BottomSheet.Root';

  const Handle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function Handle({ className, ...props }, ref) {
      return (
        <div ref={ref} aria-hidden="true" className={cx(classes.handle, className)} {...props} />
      );
    },
  );
  Handle.displayName = 'M3BottomSheet.Handle';

  return {
    Root,
    Trigger: DrawerPrimitive.Trigger,
    Portal: DrawerPrimitive.Portal,
    Backdrop: createSlot(DrawerPrimitive.Backdrop, classes.backdrop),
    Viewport: createSlot(DrawerPrimitive.Viewport, classes.viewport),
    Popup: createSlot(DrawerPrimitive.Popup, classes.popup),
    Handle,
    Title: createSlot(DrawerPrimitive.Title, classes.title),
    Description: createSlot(DrawerPrimitive.Description, classes.description),
    Close: DrawerPrimitive.Close,
  };
}
