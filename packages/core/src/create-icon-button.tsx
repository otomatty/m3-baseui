'use client';
/**
 * create-icon-button.tsx — headless Icon Button factory.
 *
 * Mirrors create-button: all React logic lives here once; each engine injects a
 * class resolver. Uses Base UI's `useRender` for polymorphism so callers can
 * pass `render={<a />}` while keeping M3 styling and the ripple. The optional
 * `selected` prop drives `aria-pressed` + `data-selected` for toggle styling.
 */
import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';

import type { IconButtonClassResolver, IconButtonProps } from './icon-button.contract';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';
import { TouchTarget } from './touch-target';

/**
 * Build the M3 Icon Button bound to one engine's class resolver.
 *
 * @param resolve - Turns the variant/selected/size/width state into a class string.
 * @returns A `forwardRef` Icon Button supporting polymorphism, toggle, and ripple.
 */
export function createIconButton(resolve: IconButtonClassResolver) {
  /** Renders the icon-button surface; toggles `aria-pressed`/`data-selected`. */
  function IconButton(
    {
      variant = 'standard',
      size = 's',
      width = 'default',
      selected,
      ripple = true,
      className,
      children,
      render,
      ...rest
    }: IconButtonProps & { render?: useRender.RenderProp },
    forwardedRef: React.Ref<HTMLButtonElement>,
  ): React.JSX.Element {
    const cls = cx(resolve({ variant, selected, size, width }), className);

    return useRender({
      render: render ?? <button type="button" />,
      ref: forwardedRef,
      props: {
        ...rest,
        className: cls,
        ...(selected !== undefined
          ? { 'aria-pressed': selected, 'data-selected': selected ? '' : undefined }
          : {}),
        children: (
          <>
            {children}
            {ripple ? <Ripple /> : null}
            <TouchTarget />
          </>
        ),
      },
    });
  }

  const Forwarded = React.forwardRef(IconButton);
  Forwarded.displayName = 'M3IconButton';
  return Forwarded;
}
