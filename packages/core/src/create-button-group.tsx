'use client';
/**
 * create-button-group.tsx — the headless ButtonGroup factory.
 *
 * A `role="group"` container that lays related buttons in a horizontal row.
 * All React logic (ref forwarding, Base UI render composition, prop spreading)
 * lives here once; each engine supplies only the class resolver, so both builds
 * emit identical DOM + `data-*` and stay drop-in compatible.
 */
import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';

import type { ButtonGroupClassResolver, ButtonGroupProps } from './button-group.contract';
import { cx } from './utils';

/**
 * Build the M3 ButtonGroup bound to one engine's class resolver.
 *
 * @param resolve - Turns the variant state into an engine class string.
 * @returns A `forwardRef` group container supporting polymorphism via `render`.
 */
export function createButtonGroup(resolve: ButtonGroupClassResolver) {
  function ButtonGroup(
    {
      variant = 'standard',
      className,
      render,
      ...rest
    }: ButtonGroupProps & { render?: useRender.RenderProp },
    forwardedRef: React.Ref<HTMLDivElement>,
  ): React.JSX.Element {
    return useRender({
      render: render ?? <div />,
      ref: forwardedRef,
      props: {
        role: 'group',
        ...rest,
        className: cx(resolve({ variant }), className),
      },
    });
  }

  const Forwarded = React.forwardRef(ButtonGroup);
  Forwarded.displayName = 'M3ButtonGroup';
  return Forwarded;
}
