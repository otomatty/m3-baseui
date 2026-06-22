'use client';
/**
 * slot.tsx — helpers for wrapping Base UI parts with M3 classes.
 *
 * Every Base UI v1 part is a forwardRef component that accepts `className`
 * (a string *or* a function of its state), `render`, and the host element's
 * native props. These helpers let the headless factories in `@m3/core` attach
 * the engine-resolved class strings to each part while preserving Base UI's
 * behavior, refs, and `data-*` state attributes. Each engine supplies different
 * class strings; the DOM and state attributes are identical, so the two builds
 * stay drop-in compatible.
 */
import * as React from 'react';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';

/** A className as Base UI accepts it: a string or a function of part state. */
export type ClassValue = string | ((state: any) => string | undefined) | undefined;

/**
 * Compose a base class (from our resolver) with a user-supplied className,
 * supporting Base UI's function form.
 */
export function mergeClassName(base: string, incoming?: ClassValue): ClassValue {
  if (typeof incoming === 'function') {
    return (state: any) => cx(base, incoming(state));
  }
  return cx(base, incoming) || undefined;
}

interface SlotProps {
  className?: ClassValue;
}

export interface SlotOptions {
  /** Append the M3 pointer ripple as the last child (button-like surfaces). */
  ripple?: boolean;
}

/**
 * Wrap a Base UI part so it always carries `baseClass` merged with any caller
 * className. Optionally composes the M3 ripple as the trailing child.
 */
export function createSlot<P extends SlotProps>(
  Part: React.ComponentType<P>,
  baseClass: string,
  options: SlotOptions = {},
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<unknown>> {
  const Slot = React.forwardRef<unknown, P>(function Slot(props, ref) {
    const { className, children, ...rest } = props as SlotProps & {
      children?: React.ReactNode;
    };
    const content = options.ripple ? (
      <>
        {children}
        <Ripple />
      </>
    ) : (
      children
    );
    return React.createElement(Part, {
      ...(rest as P),
      ref,
      className: mergeClassName(baseClass, className),
      children: content,
    } as unknown as P);
  });
  const partName =
    (Part as { displayName?: string; name?: string }).displayName ??
    (Part as { name?: string }).name ??
    'Part';
  Slot.displayName = `M3Slot(${partName})`;
  return Slot as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<unknown>
  >;
}
