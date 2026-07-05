'use client';
/**
 * create-menu.tsx — headless M3 Menu parts.
 *
 * Base UI Menu composition exposed as a namespace. The Popup is the M3 menu
 * surface; each Item gets a ripple + state layer (driven by data-highlighted).
 * Selectable (checkbox/radio) items share the Select popup row tokens
 * (secondary-container fill + position-based shapes, issue #98).
 */
import * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import { assignListItemPositions } from '../../menu-list-position';
import type { MenuClasses } from './contract';
import { createSlot, mergeClassName, type ClassValue } from '../../slot';

/** Default leading checkmark for selectable menu items. */
function MenuCheck(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

type MenuPositionerProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Positioner>;
type MenuPopupProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Popup>;

/**
 * Build the M3 Menu namespace (Root, Popup, Item, submenu, selectable items)
 * bound to one engine's slot classes.
 *
 * @param classes - Engine-resolved class strings for each menu slot.
 * @returns A namespace of Base UI menu parts wrapped with M3 styling + ripple.
 */
export function createMenu(classes: MenuClasses) {
  /** M3 menu placement: below the anchor with an 8dp gap (Playground default). */
  const Positioner = React.forwardRef<
    React.ElementRef<typeof MenuPrimitive.Positioner>,
    MenuPositionerProps
  >(function Positioner({ side = 'bottom', sideOffset = 8, align = 'start', ...props }, ref) {
    return (
      <MenuPrimitive.Positioner
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        {...props}
      />
    );
  });
  Positioner.displayName = 'M3Menu.Positioner';

  const CheckboxItem = createSlot(MenuPrimitive.CheckboxItem, classes.checkboxItem, {
    ripple: true,
  });
  const RadioItem = createSlot(MenuPrimitive.RadioItem, classes.radioItem, { ripple: true });

  const isMenuSelectableItem = (child: React.ReactElement) =>
    child.type === CheckboxItem || child.type === RadioItem;
  const isMenuPositionContainer = (child: React.ReactElement) =>
    child.type === MenuPrimitive.Group || child.type === MenuPrimitive.RadioGroup;

  const Popup = React.forwardRef<React.ElementRef<typeof MenuPrimitive.Popup>, MenuPopupProps>(
    function Popup({ className, children, ...props }, ref) {
      const positionedChildren = assignListItemPositions(children, isMenuSelectableItem, {
        shouldRecurseInto: isMenuPositionContainer,
      });
      return (
        <MenuPrimitive.Popup
          ref={ref}
          className={mergeClassName(classes.popup, className as ClassValue)}
          {...props}
        >
          {positionedChildren}
        </MenuPrimitive.Popup>
      );
    },
  );
  Popup.displayName = 'M3Menu.Popup';

  const CheckboxItemIndicator = createSlot(
    MenuPrimitive.CheckboxItemIndicator,
    classes.itemIndicator,
    { defaultProps: { keepMounted: true } },
  );
  const RadioItemIndicator = createSlot(MenuPrimitive.RadioItemIndicator, classes.itemIndicator, {
    defaultProps: { keepMounted: true },
  });

  return {
    Root: MenuPrimitive.Root,
    Trigger: MenuPrimitive.Trigger,
    Portal: MenuPrimitive.Portal,
    Positioner,
    Popup,
    Item: createSlot(MenuPrimitive.Item, classes.item, { ripple: true }),
    Separator: createSlot(MenuPrimitive.Separator, classes.separator),
    Group: MenuPrimitive.Group,
    GroupLabel: createSlot(MenuPrimitive.GroupLabel, classes.groupLabel),
    // Submenu: SubmenuRoot is a context provider; the trigger looks like an item
    // with a trailing chevron and stays highlighted while its submenu is open.
    SubmenuRoot: MenuPrimitive.SubmenuRoot,
    SubmenuTrigger: createSlot(MenuPrimitive.SubmenuTrigger, classes.submenuTrigger, {
      ripple: true,
    }),
    // Selectable items (single + multi select).
    RadioGroup: MenuPrimitive.RadioGroup,
    CheckboxItem,
    RadioItem,
    CheckboxItemIndicator,
    RadioItemIndicator,
    /** Default leading checkmark glyph for use inside the indicators. */
    Check: MenuCheck,
  };
}
