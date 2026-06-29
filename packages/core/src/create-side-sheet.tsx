'use client';
/**
 * create-side-sheet.tsx — headless M3 Side sheet parts.
 *
 * Base UI Drawer composition exposed as a namespace. `Root` maps the M3 `side`
 * to the drawer's swipe direction and the M3 `variant` to its behaviour:
 * `standard` is non-modal (no focus trap / scroll lock), keeps outside pointer
 * interaction alive (`disablePointerDismissal`) so it can co-exist with the page,
 * and suppresses the scrim — so a `<Backdrop />` left in the markup renders
 * nothing. The variant is carried over context to `Popup` (elevation +
 * leading-edge rounding) and `Backdrop`. `Header` is a presentational row for the
 * headline + close. Each engine supplies the slot classes, so the DOM + `data-*`
 * stay identical between builds.
 */
import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';

import type { SideSheetClasses, SideSheetOwnProps, SideSheetVariant } from './side-sheet.contract';
import { createSlot, mergeClassName, type ClassValue } from './slot';
import { cx } from './utils';

type RootProps = SideSheetOwnProps &
  Omit<React.ComponentProps<typeof DrawerPrimitive.Root>, 'swipeDirection' | 'modal'>;
type PopupProps = React.ComponentProps<typeof DrawerPrimitive.Popup>;
type BackdropProps = React.ComponentProps<typeof DrawerPrimitive.Backdrop>;

export function createSideSheet(classes: SideSheetClasses) {
  const VariantContext = React.createContext<SideSheetVariant>('modal');

  function Root({ variant = 'modal', side = 'right', ...props }: RootProps): React.JSX.Element {
    return (
      <VariantContext.Provider value={variant}>
        <DrawerPrimitive.Root
          swipeDirection={side}
          modal={variant !== 'standard'}
          // A non-modal sheet must survive clicks on the page it co-exists with;
          // Base UI otherwise dismisses non-modal drawers on outside press/focus.
          disablePointerDismissal={variant === 'standard'}
          {...props}
        />
      </VariantContext.Provider>
    );
  }
  Root.displayName = 'M3SideSheet.Root';

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
  Backdrop.displayName = 'M3SideSheet.Backdrop';

  const Popup = React.forwardRef<HTMLDivElement, PopupProps>(function Popup(
    { className, ...props },
    ref,
  ) {
    const variant = React.useContext(VariantContext);
    return (
      <DrawerPrimitive.Popup
        ref={ref}
        className={mergeClassName(classes.popup({ variant }), className as ClassValue)}
        {...props}
      />
    );
  });
  Popup.displayName = 'M3SideSheet.Popup';

  const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function Header({ className, ...props }, ref) {
      return <div ref={ref} className={cx(classes.header, className)} {...props} />;
    },
  );
  Header.displayName = 'M3SideSheet.Header';

  return {
    Root,
    Trigger: DrawerPrimitive.Trigger,
    Portal: DrawerPrimitive.Portal,
    Backdrop,
    Viewport: createSlot(DrawerPrimitive.Viewport, classes.viewport),
    Popup,
    Header,
    Title: createSlot(DrawerPrimitive.Title, classes.title),
    Description: createSlot(DrawerPrimitive.Description, classes.description),
    Close: createSlot(DrawerPrimitive.Close, classes.close),
  };
}
