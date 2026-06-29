'use client';
/**
 * create-radio.tsx — headless M3 Radio + RadioGroup factories.
 *
 * Radio composes Base UI's Radio (Root circle + Indicator dot); RadioGroup is a
 * thin styled wrapper over Base UI's RadioGroup that provides the M3 layout.
 * All checked/disabled styling lives in CSS via Base UI's `data-*` attributes.
 */
import * as React from 'react';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import type { RadioClasses } from './radio.contract';
import { mergeClassName } from './slot';
import { TouchTarget } from './touch-target';

type RadioRootProps = React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>;
type RadioProps = RadioRootProps & {
  /** M3 error state: tints the ring, dot, and state layer with error tokens. */
  error?: boolean;
};
type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive>;

/**
 * Build the M3 Radio bound to one engine's slot classes.
 *
 * @param classes - Engine-resolved class strings for the ring and dot indicator.
 * @returns A `forwardRef` Radio accepting Base UI's props plus `error`.
 */
export function createRadio(classes: RadioClasses) {
  /** Renders the ring + dot indicator, tinting with error tokens on `error`. */
  const Radio = React.forwardRef<React.ElementRef<typeof RadioPrimitive.Root>, RadioProps>(
    function Radio({ className, error, ...props }, ref) {
      const errorProps: { [key: `data-${string}`]: string } | undefined = error
        ? { 'data-error': '' }
        : undefined;
      return (
        <RadioPrimitive.Root
          ref={ref}
          className={mergeClassName(classes.root, className)}
          {...errorProps}
          {...props}
        >
          <RadioPrimitive.Indicator className={classes.indicator} keepMounted />
          <TouchTarget />
        </RadioPrimitive.Root>
      );
    },
  );
  Radio.displayName = 'M3Radio';
  return Radio;
}

/**
 * Build the M3 RadioGroup wrapper that lays its radios out per the engine class.
 *
 * @param rootClass - Engine-resolved layout class for the group container.
 * @returns A `forwardRef` RadioGroup over Base UI's RadioGroup.
 */
export function createRadioGroup(rootClass: string) {
  const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive>,
    RadioGroupProps
  >(function RadioGroup({ className, ...props }, ref) {
    return (
      <RadioGroupPrimitive ref={ref} className={mergeClassName(rootClass, className)} {...props} />
    );
  });
  RadioGroup.displayName = 'M3RadioGroup';
  return RadioGroup;
}
