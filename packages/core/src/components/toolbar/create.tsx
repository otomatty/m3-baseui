'use client';
/**
 * create-toolbar.tsx — headless M3 Expressive Toolbar.
 *
 * A presentational `role="toolbar"` that groups action `children`. `type`
 * (floating/docked), `variant` (standard/vibrant) and `orientation`
 * (horizontal/vertical) drive the resolved class string and are mirrored onto
 * `data-type` / `data-variant` / `data-orientation` for CSS; a vertical toolbar
 * also advertises `aria-orientation="vertical"` (horizontal is the toolbar role's
 * default, so it is left implicit). Each engine injects the class resolver, so the
 * DOM stays identical between builds.
 */
import * as React from 'react';

import type { ToolbarClassResolver, ToolbarProps } from './contract';
import { cx } from '../../utils';

export function createToolbar(resolve: ToolbarClassResolver) {
  const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
    { type = 'floating', variant = 'standard', orientation = 'horizontal', className, ...rest },
    ref,
  ) {
    // `rest` is spread first so the shared DOM / `data-*` contract (role,
    // aria-orientation, data-type, data-variant, data-orientation) stays
    // authoritative and a caller cannot desync it from the props.
    return (
      <div
        {...rest}
        ref={ref}
        role="toolbar"
        aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
        data-type={type}
        data-variant={variant}
        data-orientation={orientation}
        className={cx(resolve({ type, variant, orientation }), className)}
      />
    );
  });
  Toolbar.displayName = 'M3Toolbar';
  return Toolbar;
}
