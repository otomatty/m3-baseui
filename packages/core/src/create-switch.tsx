'use client';
/**
 * create-switch.tsx — headless M3 Switch factory.
 *
 * Composes Base UI's Switch (Root track + Thumb handle). All checked/disabled
 * styling is expressed in CSS via Base UI's `data-*` attributes, so the two
 * engine builds emit identical DOM and stay drop-in compatible. An optional
 * `icons` prop renders icons on the handle; both stay mounted and CSS reveals
 * the one matching the current state (via the root's `data-checked`).
 */
import * as React from 'react';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

import type { SwitchClasses, SwitchIcons } from './switch.contract';
import { mergeClassName } from './slot';

type RootProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;
type SwitchProps = RootProps & {
  /** Optional handle icons (checked / unchecked). */
  icons?: SwitchIcons;
};

/**
 * Build the M3 Switch bound to one engine's slot classes.
 *
 * @param classes - Engine-resolved class strings for the track, thumb, and icons.
 * @returns A `forwardRef` Switch accepting Base UI's props plus optional `icons`.
 */
export function createSwitch(classes: SwitchClasses) {
  /** Renders the track + thumb, mounting handle icons when `icons` is supplied. */
  const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
    function Switch({ className, icons, ...props }, ref) {
      // The unchecked handle grows to fit an icon only when one is supplied.
      const withIcon = icons?.unchecked != null;
      const thumbProps: Record<string, unknown> = { className: classes.thumb };
      if (withIcon) thumbProps['data-with-icon'] = '';

      return (
        <SwitchPrimitive.Root
          ref={ref}
          className={mergeClassName(classes.root, className)}
          {...props}
        >
          <SwitchPrimitive.Thumb
            {...(thumbProps as React.ComponentProps<typeof SwitchPrimitive.Thumb>)}
          >
            {icons?.checked != null ? (
              <span className={classes.iconChecked} aria-hidden="true">
                {icons.checked}
              </span>
            ) : null}
            {icons?.unchecked != null ? (
              <span className={classes.iconUnchecked} aria-hidden="true">
                {icons.unchecked}
              </span>
            ) : null}
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
      );
    },
  );
  Switch.displayName = 'M3Switch';
  return Switch;
}
