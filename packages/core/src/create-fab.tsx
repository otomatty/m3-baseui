'use client';
/**
 * create-fab.tsx — the headless FAB factory.
 *
 * Mirrors create-button: all React logic (ref forwarding, Base UI `useRender`
 * polymorphism, ripple, prop spreading) lives here once; each engine injects a
 * class resolver. Passing `render` lets callers host the FAB on another element
 * (e.g. `Menu.Trigger render={<Fab />}` for a FAB menu) while keeping styling.
 */
import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';

import type { FabClassResolver, FabProps } from './fab.contract';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';

export function createFab(resolve: FabClassResolver) {
  function Fab(
    {
      size = 'regular',
      color = 'surface',
      ripple = true,
      className,
      children,
      render,
      ...rest
    }: FabProps & { render?: useRender.RenderProp },
    forwardedRef: React.Ref<HTMLButtonElement>,
  ): React.JSX.Element {
    const cls = cx(resolve({ size, color }), className);

    return useRender({
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
  }

  const Forwarded = React.forwardRef(Fab);
  Forwarded.displayName = 'M3Fab';
  return Forwarded;
}
