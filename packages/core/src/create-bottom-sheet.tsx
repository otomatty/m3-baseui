'use client';
/**
 * create-bottom-sheet.tsx — headless M3 Bottom sheet parts.
 *
 * Base UI Drawer composition exposed as a namespace. `Root` fixes the swipe
 * direction to "down" and maps the M3 `variant` to the drawer's behaviour:
 * `standard` is non-modal (no focus trap / scroll lock), keeps outside pointer
 * interaction alive (`disablePointerDismissal`) so it can co-exist with the page,
 * and suppresses the scrim — so a `<Backdrop />` left in the markup renders
 * nothing. The variant is carried to `Backdrop` over context. Viewport, Popup,
 * Title and Description carry the M3 classes; `Handle` is a presentational drag
 * affordance. Each engine supplies the slot classes, so the DOM + `data-*`
 * (data-starting-style / data-ending-style / data-swiping / data-swipe-direction)
 * stay identical between builds.
 */
import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';

import type {
  BottomSheetClasses,
  BottomSheetOwnProps,
  BottomSheetVariant,
} from './bottom-sheet.contract';
import { createSlot, mergeClassName, type ClassValue } from './slot';
import { cx } from './utils';

type RootProps = BottomSheetOwnProps &
  Omit<React.ComponentProps<typeof DrawerPrimitive.Root>, 'swipeDirection' | 'modal'>;
type BackdropProps = React.ComponentProps<typeof DrawerPrimitive.Backdrop>;

export function createBottomSheet(classes: BottomSheetClasses) {
  const VariantContext = React.createContext<BottomSheetVariant>('modal');

  function Root({ variant = 'modal', ...props }: RootProps): React.JSX.Element {
    return (
      <VariantContext.Provider value={variant}>
        <DrawerPrimitive.Root
          swipeDirection="down"
          modal={variant !== 'standard'}
          // A non-modal sheet must survive clicks on the page it co-exists with;
          // Base UI otherwise dismisses non-modal drawers on outside press/focus.
          disablePointerDismissal={variant === 'standard'}
          {...props}
        />
      </VariantContext.Provider>
    );
  }
  Root.displayName = 'M3BottomSheet.Root';

  // Standard (non-modal) sheets have no scrim; render nothing so callers can keep
  // a single markup shape and switch only the variant.
  const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(function Backdrop(
    { className, ...props },
    ref,
  ) {
    const variant = React.useContext(VariantContext);
    if (variant === 'standard') return null;
    return (
      <DrawerPrimitive.Backdrop
        ref={ref}
        className={mergeClassName(classes.backdrop, className as ClassValue)}
        {...props}
      />
    );
  });
  Backdrop.displayName = 'M3BottomSheet.Backdrop';

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
    Backdrop,
    Viewport: createSlot(DrawerPrimitive.Viewport, classes.viewport),
    Popup: createSlot(DrawerPrimitive.Popup, classes.popup),
    Handle,
    Title: createSlot(DrawerPrimitive.Title, classes.title),
    Description: createSlot(DrawerPrimitive.Description, classes.description),
    Close: DrawerPrimitive.Close,
  };
}
