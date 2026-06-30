'use client';
/**
 * create-dialog.tsx — headless M3 Dialog parts.
 *
 * Base UI Dialog composition exposed as a namespace. Root/Trigger/Portal are
 * behavior-only; Backdrop (scrim), Popup (surface), Title, Description and Close
 * carry the M3 classes. `Popup` accepts `fullscreen` to switch to the
 * edge-to-edge variant (mirrored as `data-fullscreen` for styling/E2E hooks).
 * `Icon`, `Header`, `Divider` and `Actions` are presentational layout slots for
 * the M3 anatomy (centered hero icon, fullscreen header row + separator, and the
 * end-aligned action row). Each engine supplies the class strings, so the DOM +
 * `data-*` stay identical between builds.
 */
import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

import type { DialogClasses, DialogPopupOwnProps } from './dialog.contract';
import { createSlot, mergeClassName, type ClassValue } from './slot';
import { cx } from './utils';

export function createDialog(classes: DialogClasses) {
  type PopupProps = DialogPopupOwnProps & React.ComponentProps<typeof DialogPrimitive.Popup>;
  const Popup = React.forwardRef<HTMLDivElement, PopupProps>(function Popup(
    { fullscreen = false, className, ...props },
    ref,
  ) {
    return (
      <DialogPrimitive.Popup
        ref={ref}
        data-fullscreen={fullscreen ? '' : undefined}
        className={mergeClassName(classes.popup({ fullscreen }), className as ClassValue)}
        {...props}
      />
    );
  });
  Popup.displayName = 'M3Dialog.Popup';

  const Icon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    function Icon({ className, ...props }, ref) {
      return (
        <span
          ref={ref}
          data-slot="dialog-icon"
          aria-hidden="true"
          className={cx(classes.icon, className)}
          {...props}
        />
      );
    },
  );
  Icon.displayName = 'M3Dialog.Icon';

  const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function Header({ className, ...props }, ref) {
      return <div ref={ref} className={cx(classes.header, className)} {...props} />;
    },
  );
  Header.displayName = 'M3Dialog.Header';

  const Divider = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
    function Divider({ className, ...props }, ref) {
      // <hr> carries the implicit `separator` role + horizontal orientation.
      return <hr ref={ref} className={cx(classes.divider, className)} {...props} />;
    },
  );
  Divider.displayName = 'M3Dialog.Divider';

  const Actions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function Actions({ className, ...props }, ref) {
      return <div ref={ref} className={cx(classes.actions, className)} {...props} />;
    },
  );
  Actions.displayName = 'M3Dialog.Actions';

  return {
    Root: DialogPrimitive.Root,
    Trigger: DialogPrimitive.Trigger,
    Portal: DialogPrimitive.Portal,
    Backdrop: createSlot(DialogPrimitive.Backdrop, classes.backdrop),
    Popup,
    Icon,
    Header,
    Title: createSlot(DialogPrimitive.Title, classes.title),
    Description: createSlot(DialogPrimitive.Description, classes.description),
    Divider,
    Actions,
    Close: createSlot(DialogPrimitive.Close, classes.close),
  };
}
