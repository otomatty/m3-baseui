'use client';
/**
 * create-card.tsx — headless M3 Card.
 *
 * Covers the three M3 card styles. A plain card renders a `<div>`; an
 * `interactive` card renders a `<button>` with the M3 state layer + ripple and
 * exposes `data-disabled` for per-token dimming. Each engine supplies the root
 * class, so the DOM + `data-*` stay identical between builds.
 */
import * as React from 'react';

import type { CardClasses, CardProps } from './card.contract';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';

export function createCard(classes: CardClasses) {
  const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
    { variant = 'elevated', interactive = false, disabled = false, className, children, ...rest },
    ref,
  ) {
    const cls = cx(classes.root({ variant, interactive }), className);

    if (interactive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={cls}
          disabled={disabled}
          data-disabled={disabled ? '' : undefined}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
          {!disabled ? <Ripple /> : null}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cls}
        data-disabled={disabled ? '' : undefined}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  });
  Card.displayName = 'M3Card';
  return Card;
}
