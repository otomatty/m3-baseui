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

export function createChip(resolve: ChipClassResolver) {
  function Chip(
    {
      variant = 'assist',
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
    const classes = resolve({ variant });
    const cls = cx(classes.root, className);
    const rippleNode = ripple ? <Ripple /> : null;

    if (variant === 'filter') {
      return (
        <Toggle
          ref={forwardedRef as React.Ref<HTMLButtonElement>}
          pressed={selected}
          onPressedChange={onSelectedChange ? (p) => onSelectedChange(p) : undefined}
          className={cls}
          {...rest}
        >
          {/* M3 leading checkmark: kept mounted, revealed via data-pressed in CSS */}
          <span className={classes.check} data-slot="check" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </span>
          {children}
          {rippleNode}
        </Toggle>
      );
    }

    if (variant === 'input') {
      return (
        <span ref={forwardedRef as React.Ref<HTMLSpanElement>} className={cls} {...rest}>
          {children}
          {onRemove ? (
            <button
              type="button"
              aria-label={removeLabel}
              onClick={onRemove}
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
        {...rest}
      >
        {children}
        {rippleNode}
      </button>
    );
  }

  const Forwarded = React.forwardRef(Chip);
  Forwarded.displayName = 'M3Chip';
  return Forwarded;
}
