'use client';
/**
 * create-divider.tsx — the headless M3 Divider factory.
 *
 * A presentational `role="separator"` rule. All logic (ref forwarding, Base UI
 * `useRender` polymorphism, ARIA orientation) lives here once; each engine
 * injects a class resolver keyed on `inset` + `orientation`. Passing `render`
 * lets callers host the divider on another element (e.g. an `<hr>`) while
 * keeping the M3 styling and the separator semantics.
 */
import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';

import type { DividerClassResolver, DividerProps } from './divider.contract';
import { cx } from './utils';

export function createDivider(resolve: DividerClassResolver) {
  function Divider(
    {
      inset = 'full',
      orientation = 'horizontal',
      className,
      render,
      ...rest
    }: DividerProps & { render?: useRender.RenderProp },
    forwardedRef: React.Ref<HTMLDivElement>,
  ): React.JSX.Element {
    const cls = cx(resolve({ inset, orientation }), className);

    return useRender({
      render: render ?? <div />,
      ref: forwardedRef,
      props: {
        role: 'separator',
        // A separator defaults to horizontal; only flag the vertical case.
        'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
        'data-orientation': orientation,
        'data-inset': inset !== 'full' ? inset : undefined,
        ...rest,
        className: cls,
      },
    });
  }

  const Forwarded = React.forwardRef(Divider);
  Forwarded.displayName = 'M3Divider';
  return Forwarded;
}
