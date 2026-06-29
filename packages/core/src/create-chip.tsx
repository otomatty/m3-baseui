'use client';
/**
 * create-chip.tsx — headless M3 Chip factory.
 *
 * One component covers the four M3 chip types. `filter` renders a Base UI Toggle
 * (selectable, `aria-pressed` + `data-pressed`); `input` renders a container with
 * an optional trailing remove button; `assist` / `suggestion` render a plain
 * button. Each engine supplies the slot classes, so the DOM stays identical.
 */
import * as React from 'react';
import { Toggle } from '@base-ui/react/toggle';

import type { ChipClassResolver, ChipProps } from './chip.contract';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';
import { TouchTarget } from './touch-target';

/**
 * Build the M3 Chip bound to one engine's class resolver.
 *
 * @param resolve - Turns the variant/elevated state into the chip's slot classes.
 * @returns A `forwardRef` Chip covering the assist/filter/input/suggestion types.
 */
export function createChip(resolve: ChipClassResolver) {
  /** Renders the chip body per `variant`, plus optional icon/avatar/remove/check slots. */
  function Chip(
    {
      variant = 'assist',
      elevated,
      avatar,
      icon,
      selected,
      onSelectedChange,
      onRemove,
      removeLabel = 'Remove',
      ripple = true,
      className,
      children,
      ...rest
    }: ChipProps,
    forwardedRef: React.Ref<HTMLElement>,
  ): React.JSX.Element {
    const classes = resolve({ variant, elevated });
    const leadingIcon = icon != null;
    const leadingAvatar = avatar != null && !leadingIcon;
    const leadingMarkers: { [key: `data-${string}`]: string } = {};
    if (leadingIcon) leadingMarkers['data-with-leading-icon'] = '';
    const cls = cx(classes.root, className);
    const rippleNode = ripple ? <Ripple /> : null;
    const iconNode = leadingIcon ? (
      <span className={classes.icon} data-slot="icon" aria-hidden="true">
        {icon}
      </span>
    ) : null;
    const avatarNode = leadingAvatar ? (
      <span className={classes.avatar} data-slot="avatar" aria-hidden="true">
        {avatar}
      </span>
    ) : null;

    if (variant === 'filter') {
      return (
        <Toggle
          ref={forwardedRef as React.Ref<HTMLButtonElement>}
          pressed={selected}
          onPressedChange={onSelectedChange ? (p) => onSelectedChange(p) : undefined}
          className={cls}
          {...leadingMarkers}
          {...rest}
        >
          {iconNode}
          {avatarNode}
          {/* M3 leading checkmark: kept mounted, revealed via data-pressed in CSS */}
          <span className={classes.check} data-slot="check" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </span>
          {children}
          {rippleNode}
          <TouchTarget />
        </Toggle>
      );
    }

    if (variant === 'input') {
      // WAI-ARIA APG (grid/chip): a deletable input chip is focusable and can be
      // removed with Delete/Backspace. We only make the body interactive when it
      // is actually removable and not disabled. `role="group"` (not `button`)
      // keeps the trailing remove `<button>` from nesting inside an interactive
      // control (which axe flags), while still giving the chip a keyboard stop.
      const disabled = (rest as { disabled?: boolean }).disabled === true;
      const deletable = onRemove != null && !disabled;
      const restKeyDown = (rest as React.HTMLAttributes<HTMLSpanElement>).onKeyDown;
      // Applied together so `role` is always present alongside the key handler
      // (keeps the span a legitimate, focusable interactive target).
      const interactiveProps = deletable
        ? {
            role: 'group' as const,
            tabIndex: 0,
            onKeyDown: (event: React.KeyboardEvent<HTMLSpanElement>) => {
              restKeyDown?.(event);
              if (event.defaultPrevented) return;
              if (event.key === 'Delete' || event.key === 'Backspace') {
                event.preventDefault();
                onRemove?.();
              }
            },
          }
        : undefined;

      return (
        <span
          ref={forwardedRef as React.Ref<HTMLSpanElement>}
          className={cls}
          {...leadingMarkers}
          {...rest}
          {...interactiveProps}
        >
          {iconNode}
          {avatarNode}
          {children}
          {onRemove ? (
            <button
              type="button"
              aria-label={removeLabel}
              onClick={onRemove}
              disabled={disabled}
              className={classes.remove}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          ) : null}
        </span>
      );
    }

    // assist / suggestion
    return (
      <button
        ref={forwardedRef as React.Ref<HTMLButtonElement>}
        type="button"
        className={cls}
        {...leadingMarkers}
        {...rest}
      >
        {iconNode}
        {avatarNode}
        {children}
        {rippleNode}
        <TouchTarget />
      </button>
    );
  }

  const Forwarded = React.forwardRef(Chip);
  Forwarded.displayName = 'M3Chip';
  return Forwarded;
}
