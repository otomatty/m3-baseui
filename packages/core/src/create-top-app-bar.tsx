'use client';
/**
 * create-top-app-bar.tsx — headless M3 TopAppBar.
 *
 * One presentational `<header>` whose layout is variant-driven: `small`/`center`
 * keep the headline inline within the action row; `medium`/`large` drop the
 * headline onto a second line below the row. The active variant is exposed as
 * `data-variant` for CSS hooks. Each engine injects the slot classes, so the DOM
 * and `data-*` stay identical between builds.
 */
import * as React from 'react';

import type { TopAppBarClassResolver, TopAppBarProps } from './top-app-bar.contract';
import { cx } from './utils';

export function createTopAppBar(resolve: TopAppBarClassResolver) {
  const TopAppBar = React.forwardRef<HTMLElement, TopAppBarProps>(function TopAppBar(
    { variant = 'small', leading, trailing, className, children, ...rest },
    ref,
  ) {
    const s = resolve({ variant });
    // medium/large move the headline to its own line below the action row.
    const twoLine = variant === 'medium' || variant === 'large';
    const headline = <div className={s.headline}>{children}</div>;
    // data-variant drives both engines' styling, so it stays after the prop
    // spread where a caller-supplied data-variant can't desync it from `variant`.
    return (
      <header ref={ref} className={cx(s.root, className)} {...rest} data-variant={variant}>
        <div className={s.row}>
          {leading != null ? <div className={s.leading}>{leading}</div> : null}
          {!twoLine ? headline : null}
          {trailing != null ? <div className={s.trailing}>{trailing}</div> : null}
        </div>
        {twoLine ? headline : null}
      </header>
    );
  });
  TopAppBar.displayName = 'M3TopAppBar';
  return TopAppBar;
}
