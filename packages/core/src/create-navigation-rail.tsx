'use client';
/**
 * create-navigation-rail.tsx — headless M3 NavigationRail parts.
 *
 * The vertical sibling of create-navigation-bar. `Root` is a Base UI
 * `ToggleGroup` (single-select) laid out as a column; `Item` is a `Toggle`
 * carrying its destination `value`. The selected item surfaces `data-pressed`,
 * which drives the active-indicator pill and the icon/label colors via CSS.
 * `Root` also renders an optional `header` (menu button / FAB) above the
 * destinations. Each engine injects slot classes, so the DOM and `data-*` state
 * are identical between builds.
 */
import * as React from 'react';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';

import type { NavigationRailClasses } from './navigation-rail.contract';
import { mergeClassName } from './slot';
import { Ripple } from './ripple/Ripple';

type RootProps = React.ComponentPropsWithoutRef<typeof ToggleGroup> & {
  /** Leading header region (menu icon button / FAB), above the destinations. */
  header?: React.ReactNode;
};
type ItemProps = Omit<React.ComponentPropsWithoutRef<typeof Toggle>, 'children'> & {
  /** Destination icon. */
  icon?: React.ReactNode;
  /** Destination label. */
  children?: React.ReactNode;
};

export function createNavigationRail(classes: NavigationRailClasses) {
  const Root = React.forwardRef<HTMLDivElement, RootProps>(function Root(
    { className, header, children, value, defaultValue, onValueChange, ...props },
    ref,
  ) {
    // A navigation rail always keeps one destination active. Base UI's
    // ToggleGroup still toggles off (emitting `[]`) when the pressed item is
    // tapped again, so Root owns the value and drops that deselect emission —
    // for both controlled and uncontrolled consumers (mirrors NavigationBar).
    const [internal, setInternal] = React.useState<readonly string[]>(defaultValue ?? []);
    const isControlled = value !== undefined;
    const current = isControlled ? value : internal;
    const handleValueChange: NonNullable<RootProps['onValueChange']> = (next, details) => {
      if (next.length === 0) return;
      if (!isControlled) setInternal(next);
      onValueChange?.(next, details);
    };
    return (
      <ToggleGroup
        ref={ref}
        value={current}
        onValueChange={handleValueChange}
        className={mergeClassName(classes.root, className)}
        {...props}
      >
        {header != null ? <div className={classes.header}>{header}</div> : null}
        {children}
      </ToggleGroup>
    );
  });
  Root.displayName = 'M3NavigationRail.Root';

  const Item = React.forwardRef<HTMLButtonElement, ItemProps>(function Item(
    { className, icon, children, ...props },
    ref,
  ) {
    return (
      <Toggle ref={ref} className={mergeClassName(classes.item, className)} {...props}>
        <span className={classes.iconWrap}>
          <span className={classes.indicator} aria-hidden="true" />
          <span className={classes.icon}>{icon}</span>
        </span>
        {children != null ? <span className={classes.label}>{children}</span> : null}
        <Ripple />
      </Toggle>
    );
  });
  Item.displayName = 'M3NavigationRail.Item';

  return { Root, Item };
}
