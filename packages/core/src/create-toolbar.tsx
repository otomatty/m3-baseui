'use client';
/**
 * create-toolbar.tsx — headless M3 Expressive Toolbar.
 *
 * A presentational floating `role="toolbar"` that groups action `children`.
 * `variant` (standard/vibrant) and `orientation` (horizontal/vertical) drive the
 * resolved class string and are mirrored onto `data-variant` / `data-orientation`
 * for CSS; a vertical toolbar also advertises `aria-orientation="vertical"`
 * (horizontal is the toolbar role's default, so it is left implicit). Each
 * engine injects the class resolver, so the DOM stays identical between builds.
 */
import * as React from 'react';

import type { ToolbarClassResolver, ToolbarProps } from './toolbar.contract';
import { cx } from './utils';

export function createToolbar(resolve: ToolbarClassResolver) {
  const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
    { variant = 'standard', orientation = 'horizontal', className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
        data-variant={variant}
        data-orientation={orientation}
        className={cx(resolve({ variant, orientation }), className)}
        {...rest}
      />
    );
  });
  Toolbar.displayName = 'M3Toolbar';
  return Toolbar;
}
