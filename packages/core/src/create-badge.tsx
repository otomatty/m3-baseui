'use client';
/**
 * create-badge.tsx — headless M3 Badge.
 *
 * A `value` renders the large numeric badge (capped by `max`); its absence
 * renders the small 6dp dot. The derived size is exposed as `data-size` and
 * drives the engine's class. The badge anchors itself to the top-right of a
 * positioned parent. Each engine supplies the class, so the DOM stays identical.
 */
import * as React from 'react';

import type { BadgeProps, BadgeClasses, BadgeSize } from './badge.contract';
import { cx } from './utils';

export function createBadge(classes: BadgeClasses) {
  const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    { value, max, className, ...rest },
    ref,
  ) {
    const hasValue = value != null && value !== '';
    const size: BadgeSize = hasValue ? 'large' : 'small';
    const content =
      hasValue && max != null && typeof value === 'number' && value > max ? `${max}+` : value;
    return (
      <span ref={ref} data-size={size} className={cx(classes.root({ size }), className)} {...rest}>
        {hasValue ? content : null}
      </span>
    );
  });
  Badge.displayName = 'M3Badge';
  return Badge;
}
