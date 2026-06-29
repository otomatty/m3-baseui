'use client';
/**
 * create-checkbox.tsx — headless M3 Checkbox factory.
 *
 * Composes Base UI's Checkbox (Root box + Indicator). The check mark is an
 * inline SVG tinted with currentColor; the indeterminate dash is rendered by
 * the engine CSS via the indicator's data-indeterminate state. The indicator is
 * kept mounted so the box can animate and so indeterminate styling applies.
 */
import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import type { CheckboxClasses } from './checkbox.contract';
import { mergeClassName } from './slot';
import { TouchTarget } from './touch-target';

type RootProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;
type CheckboxProps = RootProps & {
  /** M3 error state: tints the box, check, and state layer with error tokens. */
  error?: boolean;
};

/**
 * Build the M3 Checkbox bound to one engine's slot classes.
 *
 * @param classes - Engine-resolved class strings for the box, indicator, and icon.
 * @returns A `forwardRef` Checkbox accepting Base UI's props plus `error`.
 */
export function createCheckbox(classes: CheckboxClasses) {
  const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    /** Renders the box + check/indeterminate indicator, tinting on `error`. */
    function Checkbox({ className, error, ...props }, ref) {
      const errorProps: { [key: `data-${string}`]: string } | undefined = error
        ? { 'data-error': '' }
        : undefined;
      return (
        <CheckboxPrimitive.Root
          ref={ref}
          className={mergeClassName(classes.root, className)}
          {...errorProps}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={classes.indicator} keepMounted>
            <svg className={classes.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </CheckboxPrimitive.Indicator>
          <TouchTarget />
        </CheckboxPrimitive.Root>
      );
    },
  );
  Checkbox.displayName = 'M3Checkbox';
  return Checkbox;
}
