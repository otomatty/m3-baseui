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

type RootProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

export function createCheckbox(classes: CheckboxClasses) {
  const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, RootProps>(
    function Checkbox({ className, ...props }, ref) {
      return (
        <CheckboxPrimitive.Root
          ref={ref}
          className={mergeClassName(classes.root, className)}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={classes.indicator} keepMounted>
            <svg className={classes.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      );
    },
  );
  Checkbox.displayName = 'M3Checkbox';
  return Checkbox;
}
