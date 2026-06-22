'use client';
/**
 * create-switch.tsx — headless M3 Switch factory.
 *
 * Composes Base UI's Switch (Root track + Thumb handle). All checked/disabled
 * styling is expressed in CSS via Base UI's `data-*` attributes, so the two
 * engine builds emit identical DOM and stay drop-in compatible.
 */
import * as React from 'react';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

import type { SwitchClasses } from './switch.contract';
import { mergeClassName } from './slot';

type RootProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

export function createSwitch(classes: SwitchClasses) {
  const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, RootProps>(
    function Switch({ className, ...props }, ref) {
      return (
        <SwitchPrimitive.Root
          ref={ref}
          className={mergeClassName(classes.root, className)}
          {...props}
        >
          <SwitchPrimitive.Thumb className={classes.thumb} />
        </SwitchPrimitive.Root>
      );
    },
  );
  Switch.displayName = 'M3Switch';
  return Switch;
}
