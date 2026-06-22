'use client';
/**
 * create-list.tsx — headless M3 List parts (Root + Item).
 *
 * No Base UI primitive covers lists, so `Root` is a semantic `<ul role="list">`
 * and `Item` a `<li>` wrapping a styled row. Interactive rows render as a
 * `<button>` (or `<a>` when `href` is set) with the M3 state layer + ripple;
 * inert rows render a `<div>`. Line count defaults from `supportingText`. All
 * disabled rows expose `data-disabled` for per-token dimming. Each engine
 * supplies the slot classes, so the DOM + `data-*` stay identical between builds.
 */
import * as React from 'react';

import type { ListClasses, ListItemProps } from './list.contract';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';

type RootProps = React.HTMLAttributes<HTMLUListElement>;

export function createList(classes: ListClasses) {
  const Root = React.forwardRef<HTMLUListElement, RootProps>(function Root(
    { className, ...props },
    ref,
  ) {
    return <ul ref={ref} className={cx(classes.root, className)} {...props} />;
  });
  Root.displayName = 'M3List.Root';

  const Item = React.forwardRef<HTMLLIElement, ListItemProps>(function Item(
    {
      leading,
      trailing,
      supportingText,
      lines,
      interactive = false,
      disabled = false,
      href,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const resolvedLines = lines ?? (supportingText != null ? 2 : 1);
    const slots = classes.item({ lines: resolvedLines, interactive });
    const rowClass = cx(slots.item, className);

    const inner = (
      <>
        {leading != null ? (
          <span className={slots.leading} aria-hidden="true">
            {leading}
          </span>
        ) : null}
        <span className={slots.content}>
          <span className={slots.headline}>{children}</span>
          {supportingText != null ? (
            <span className={slots.supporting}>{supportingText}</span>
          ) : null}
        </span>
        {trailing != null ? <span className={slots.trailing}>{trailing}</span> : null}
        {interactive && !disabled ? <Ripple /> : null}
      </>
    );

    let row: React.ReactNode;
    if (interactive && href != null) {
      row = (
        <a
          className={rowClass}
          href={disabled ? undefined : href}
          aria-disabled={disabled || undefined}
          data-disabled={disabled ? '' : undefined}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {inner}
        </a>
      );
    } else if (interactive) {
      row = (
        <button
          type="button"
          className={rowClass}
          disabled={disabled}
          data-disabled={disabled ? '' : undefined}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {inner}
        </button>
      );
    } else {
      row = (
        <div
          className={rowClass}
          data-disabled={disabled ? '' : undefined}
          {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        >
          {inner}
        </div>
      );
    }

    // The `<li>` is structural; `Root`'s `list-none` removes the marker and the
    // styled row lives inside, so the wrapper carries no class of its own.
    return <li ref={ref}>{row}</li>;
  });
  Item.displayName = 'M3List.Item';

  return { Root, Item };
}
