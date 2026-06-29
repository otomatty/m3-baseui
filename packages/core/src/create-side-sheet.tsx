'use client';
/**
 * create-side-sheet.tsx — headless M3 Side sheet parts.
 *
 * Base UI Drawer composition exposed as a namespace. `Root` maps the M3 `side`
 * to the drawer's swipe direction and the M3 `variant` to its `modal` flag
 * (`standard` opts out of focus trap / scroll lock / scrim). The variant is
 * carried to `Popup` over context so its surface class can switch elevation +
 * leading-edge rounding without the caller repeating the prop. `Header` is a
 * presentational row for the headline + close. Each engine supplies the slot
 * classes, so the DOM + `data-*` stay identical between builds.
 */
import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';

import type { SideSheetClasses, SideSheetOwnProps, SideSheetVariant } from './side-sheet.contract';
import { createSlot, mergeClassName, type ClassValue } from './slot';
import { cx } from './utils';

type RootProps = SideSheetOwnProps &
  Omit<React.ComponentProps<typeof DrawerPrimitive.Root>, 'swipeDirection' | 'modal'>;
type PopupProps = React.ComponentProps<typeof DrawerPrimitive.Popup>;

export function createSideSheet(classes: SideSheetClasses) {
  const VariantContext = React.createContext<SideSheetVariant>('modal');

  function Root({ variant = 'modal', side = 'right', ...props }: RootProps): React.JSX.Element {
    return (
      <VariantContext.Provider value={variant}>
        <DrawerPrimitive.Root swipeDirection={side} modal={variant !== 'standard'} {...props} />
      </VariantContext.Provider>
    );
  }
  Root.displayName = 'M3SideSheet.Root';

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
    Backdrop: createSlot(DrawerPrimitive.Backdrop, classes.backdrop),
    Viewport: createSlot(DrawerPrimitive.Viewport, classes.viewport),
    Popup,
    Header,
    Title: createSlot(DrawerPrimitive.Title, classes.title),
    Description: createSlot(DrawerPrimitive.Description, classes.description),
    Close: createSlot(DrawerPrimitive.Close, classes.close),
  };
}
