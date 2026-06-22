'use client';
/**
 * create-item.tsx — headless M3 Item row primitive.
 *
 * Renders the shared row layout (`leading` + overline/headline/supporting column
 * + `trailing`) as an inert `<div>`. List rows and Navigation destinations reuse
 * this layout rather than re-implementing it. Each engine supplies the slot
 * classes, so the DOM stays identical between builds.
 */
import * as React from 'react';

import type { ItemClasses, ItemProps } from './item.contract';
import { cx } from './utils';

export function createItem(classes: ItemClasses) {
  const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
    { leading, trailing, overline, supporting, className, children, ...rest },
    ref,
  ) {
    return (
      <div ref={ref} className={cx(classes.root, className)} {...rest}>
        {leading != null ? (
          <span className={classes.leading} aria-hidden="true">
            {leading}
          </span>
        ) : null}
        <span className={classes.content}>
          {overline != null ? <span className={classes.overline}>{overline}</span> : null}
          <span className={classes.headline}>{children}</span>
          {supporting != null ? <span className={classes.supporting}>{supporting}</span> : null}
        </span>
        {trailing != null ? <span className={classes.trailing}>{trailing}</span> : null}
      </div>
    );
  });
  Item.displayName = 'M3Item';
  return Item;
}
