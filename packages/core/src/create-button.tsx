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

export function createButton(resolve: ButtonClassResolver) {
  function Button(
    {
      variant = 'filled',
      ripple = true,
      className,
      children,
      render,
      ...rest
    }: ButtonProps & { render?: useRender.RenderProp },
    forwardedRef: React.Ref<HTMLButtonElement>,
  ): React.JSX.Element {
    const cls = cx(resolve({ variant }), className);

    const element = useRender({
      render: render ?? <button type="button" />,
      ref: forwardedRef,
      props: {
        ...rest,
        className: cls,
        children: (
          <>
            {children}
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
