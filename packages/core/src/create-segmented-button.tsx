'use client';
/**
 * create-segmented-button.tsx — headless M3 SegmentedButton parts.
 *
 * `Root` is a Base UI `ToggleGroup` (single-select by default; pass `multiple`
 * for multi-select); `Item` is a `Toggle` carrying its `value`. A selected
 * segment surfaces `data-pressed`, which drives the secondary-container fill and
 * reveals the leading checkmark (hiding any provided icon) via CSS. Each engine
 * injects slot classes, so the DOM + `data-*` stay identical between builds.
 */
import * as React from 'react';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';

import type {
  SegmentedButtonClasses,
  SegmentedButtonItemOwnProps,
} from './segmented-button.contract';
import { mergeClassName } from './slot';
import { Ripple } from './ripple/Ripple';

type RootProps = React.ComponentPropsWithoutRef<typeof ToggleGroup>;
type ItemProps = Omit<React.ComponentPropsWithoutRef<typeof Toggle>, 'children'> &
  SegmentedButtonItemOwnProps & { children?: React.ReactNode };

export function createSegmentedButton(classes: SegmentedButtonClasses) {
  const Root = React.forwardRef<HTMLDivElement, RootProps>(function Root(
    { className, ...props },
    ref,
  ) {
    return <ToggleGroup ref={ref} className={mergeClassName(classes.root, className)} {...props} />;
  });
  Root.displayName = 'M3SegmentedButton.Root';

  const Item = React.forwardRef<HTMLButtonElement, ItemProps>(function Item(
    { className, icon, children, ...props },
    ref,
  ) {
    return (
      <Toggle ref={ref} className={mergeClassName(classes.item, className)} {...props}>
        {/* M3 leading checkmark: kept mounted, revealed via data-pressed in CSS. */}
        <span className={classes.check} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </span>
        {icon != null ? (
          <span className={classes.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className={classes.label}>{children}</span>
        <Ripple />
      </Toggle>
    );
  });
  Item.displayName = 'M3SegmentedButton.Item';

  return { Root, Item };
}
