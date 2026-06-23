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
    // `aria-label` is prohibited on a roleless <span>; when a caller labels the
    // badge, give it a status role (unless they set their own) so it stays valid.
    const role = rest.role ?? (rest['aria-label'] != null ? 'status' : undefined);
    return (
      <span
        {...rest}
        ref={ref}
        role={role}
        data-size={size}
        className={cx(classes.root({ size }), className)}
      >
        {hasValue ? content : null}
      </span>
    );
  });
  Badge.displayName = 'M3Badge';
  return Badge;
}
