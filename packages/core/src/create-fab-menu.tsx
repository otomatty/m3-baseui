'use client';
/**
 * create-fab-menu.tsx — headless M3 FAB menu parts.
 *
 * Base UI Menu composition specialised for the FAB menu pattern: the Trigger is
 * a FAB (reuses the FAB class resolver + ripple), the Popup stacks the actions
 * in a column, and each Item is a pill-shaped action (leading icon + label) with
 * a state layer + ripple. Roles, keyboard navigation and the `data-*` state
 * contract are delegated to Base UI Menu, so both engines stay drop-in
 * compatible by swapping only the class strings.
 */
import * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import type { FabMenuClasses } from './fab-menu.contract';
import type { FabClassResolver, FabColor, FabSize } from './fab.contract';
import { createSlot, mergeClassName } from './slot';
import { Ripple } from './ripple/Ripple';

export interface FabMenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>, 'color'> {
  /** M3 FAB size. @default 'regular' */
  size?: FabSize;
  /** M3 FAB container color. @default 'primary' */
  color?: FabColor;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export interface FabMenuItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item>, 'color'> {
  /** Container color of the item. @default 'primary' */
  color?: FabColor;
  /** Leading icon (sized to 24dp by the engine styles). */
  icon?: React.ReactNode;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

/**
 * Build the M3 FAB menu namespace bound to one engine's class strings.
 *
 * @param resolveFab - The FAB class resolver (shared with the standalone FAB).
 * @param classes - Engine-resolved popup + per-color item class strings.
 * @returns A namespace of Base UI menu parts wrapped with M3 FAB styling.
 */
export function createFabMenu(resolveFab: FabClassResolver, classes: FabMenuClasses) {
  const Trigger = React.forwardRef<HTMLButtonElement, FabMenuTriggerProps>(function Trigger(
    { size = 'regular', color = 'primary', ripple = true, className, children, ...rest },
    ref,
  ) {
    return (
      <MenuPrimitive.Trigger
        ref={ref}
        className={mergeClassName(resolveFab({ size, color }), className)}
        {...rest}
      >
        {children}
        {ripple ? <Ripple /> : null}
      </MenuPrimitive.Trigger>
    );
  });
  Trigger.displayName = 'M3FabMenuTrigger';

  const Item = React.forwardRef<HTMLDivElement, FabMenuItemProps>(function Item(
    { color = 'primary', icon, ripple = true, className, children, ...rest },
    ref,
  ) {
    return (
      <MenuPrimitive.Item
        ref={ref}
        className={mergeClassName(classes.item(color), className)}
        {...rest}
      >
        {icon != null ? (
          <span data-slot="fab-menu-leading" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {children}
        {ripple ? <Ripple /> : null}
      </MenuPrimitive.Item>
    );
  });
  Item.displayName = 'M3FabMenuItem';

  return {
    Root: MenuPrimitive.Root,
    Trigger,
    Portal: MenuPrimitive.Portal,
    Positioner: MenuPrimitive.Positioner,
    Popup: createSlot(MenuPrimitive.Popup, classes.popup),
    Item,
  };
}
