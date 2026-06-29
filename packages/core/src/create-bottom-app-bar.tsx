'use client';
/**
 * create-bottom-app-bar.tsx — headless M3 BottomAppBar.
 *
 * A presentational `role="toolbar"` bar: leading action icons (`children`) plus
 * an optional trailing FAB (`fab`). Each engine injects the slot classes, so the
 * DOM stays identical between builds.
 */
import * as React from 'react';

import type { BottomAppBarClasses, BottomAppBarProps } from './bottom-app-bar.contract';
import { cx } from './utils';

export function createBottomAppBar(classes: BottomAppBarClasses) {
  const BottomAppBar = React.forwardRef<HTMLDivElement, BottomAppBarProps>(function BottomAppBar(
    { fab, className, children, ...rest },
    ref,
  ) {
    return (
      <div ref={ref} role="toolbar" className={cx(classes.root, className)} {...rest}>
        <div className={classes.actions}>{children}</div>
        {fab != null ? <div className={classes.fab}>{fab}</div> : null}
      </div>
    );
  });
  BottomAppBar.displayName = 'M3BottomAppBar';
  return BottomAppBar;
}
