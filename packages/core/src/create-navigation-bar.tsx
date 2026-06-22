'use client';
/**
 * create-navigation-bar.tsx — headless M3 NavigationBar parts.
 *
 * `Root` is a Base UI `ToggleGroup` (single-select by default); `Item` is a
 * `Toggle` carrying its destination `value`. The selected item surfaces
 * `data-pressed`, which drives the active-indicator pill and the icon/label
 * colors via CSS. Each engine injects slot classes, so the DOM and `data-*`
 * state are identical between builds.
 */
import * as React from 'react';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';

import type { NavigationBarClasses } from './navigation-bar.contract';
import { mergeClassName } from './slot';
import { Ripple } from './ripple/Ripple';

type RootProps = React.ComponentPropsWithoutRef<typeof ToggleGroup>;
type ItemProps = Omit<React.ComponentPropsWithoutRef<typeof Toggle>, 'children'> & {
  /** Destination icon. */
  icon?: React.ReactNode;
  /** Destination label. */
  children?: React.ReactNode;
};

export function createNavigationBar(classes: NavigationBarClasses) {
  const Root = React.forwardRef<HTMLDivElement, RootProps>(function Root(
    { className, ...props },
    ref,
  ) {
    return <ToggleGroup ref={ref} className={mergeClassName(classes.root, className)} {...props} />;
  });
  Root.displayName = 'M3NavigationBar.Root';

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
  Item.displayName = 'M3NavigationBar.Item';

  return { Root, Item };
}
