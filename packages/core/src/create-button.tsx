'use client';
/**
 * create-button.tsx — the headless Button factory.
 *
 * All React logic (ref forwarding, Base UI render composition, ripple, prop
 * spreading) lives here exactly once. Each styling engine calls `createButton`
 * with its own class resolver; the resulting components emit identical DOM and
 * `data-*` state, so they are drop-in compatible.
 *
 * Polymorphism + prop merging is delegated to Base UI's `useRender`, so callers
 * can pass `render={<a />}` (or any element) to change the host while keeping
 * the M3 styling and ripple.
 */
import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';

import type { ButtonClassResolver, ButtonProps } from './button.contract';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';

/**
 * Build the M3 Button bound to one engine's class resolver.
 *
 * @param resolve - Turns the variant state into an engine class string.
 * @returns A `forwardRef` Button supporting polymorphism, icons, and the ripple.
 */
export function createButton(resolve: ButtonClassResolver) {
  /** Renders the button surface with optional leading/trailing icons + ripple. */
  function Button(
    {
      variant = 'filled',
      startIcon,
      endIcon,
      ripple = true,
      className,
      children,
      render,
      ...rest
    }: ButtonProps & { render?: useRender.RenderProp },
    forwardedRef: React.Ref<HTMLButtonElement>,
  ): React.JSX.Element {
    const cls = cx(resolve({ variant }), className);

    // M3: a leading/trailing icon trims the padding on its side to 16dp. The
    // data-* markers let the engine CSS apply that without a resolver change.
    const iconMarkers: { [key: `data-${string}`]: string } = {};
    if (startIcon != null) iconMarkers['data-with-start-icon'] = '';
    if (endIcon != null) iconMarkers['data-with-end-icon'] = '';

    const element = useRender({
      render: render ?? <button type="button" />,
      ref: forwardedRef,
      props: {
        ...rest,
        ...iconMarkers,
        className: cls,
        children: (
          <>
            {startIcon != null ? (
              <span data-slot="button-icon" aria-hidden="true">
                {startIcon}
              </span>
            ) : null}
            {children}
            {endIcon != null ? (
              <span data-slot="button-icon" aria-hidden="true">
                {endIcon}
              </span>
            ) : null}
            {ripple ? <Ripple /> : null}
          </>
        ),
      },
    });

    return element;
  }

  const Forwarded = React.forwardRef(Button);
  Forwarded.displayName = 'M3Button';
  return Forwarded;
}
