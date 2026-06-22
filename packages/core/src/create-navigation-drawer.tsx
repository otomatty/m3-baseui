'use client';
/**
 * create-navigation-drawer.tsx — headless M3 NavigationDrawer parts.
 *
 * `Root` is an `<aside>` panel (standard / modal variant); `Headline` is a
 * section title; `Item` is a full-corner destination pill rendered as a
 * `<button>` (or `<a>` when `href` is set). The active destination carries
 * `data-selected` + `aria-current="page"` to drive the secondary-container fill;
 * disabled rows expose `data-disabled`. Each engine supplies the slot classes,
 * so the DOM + `data-*` stay identical between builds.
 */
import * as React from 'react';

import type {
  NavigationDrawerClasses,
  NavigationDrawerItemOwnProps,
  NavigationDrawerOwnProps,
} from './navigation-drawer.contract';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';

type RootProps = NavigationDrawerOwnProps & React.HTMLAttributes<HTMLElement>;
type HeadlineProps = React.HTMLAttributes<HTMLHeadingElement>;
type ItemProps = NavigationDrawerItemOwnProps &
  Omit<React.HTMLAttributes<HTMLElement>, 'color'> & { href?: string };

export function createNavigationDrawer(classes: NavigationDrawerClasses) {
  const Root = React.forwardRef<HTMLElement, RootProps>(function Root(
    { variant = 'standard', className, ...props },
    ref,
  ) {
    return <aside ref={ref} className={cx(classes.root({ variant }), className)} {...props} />;
  });
  Root.displayName = 'M3NavigationDrawer.Root';

  const Headline = React.forwardRef<HTMLHeadingElement, HeadlineProps>(function Headline(
    { className, ...props },
    ref,
  ) {
    return <h3 ref={ref} className={cx(classes.headline, className)} {...props} />;
  });
  Headline.displayName = 'M3NavigationDrawer.Headline';

  const Item = React.forwardRef<HTMLElement, ItemProps>(function Item(
    { leading, trailing, selected = false, disabled = false, href, className, children, ...rest },
    ref,
  ) {
    const cls = cx(classes.item, className);
    const inner = (
      <>
        {leading != null ? (
          <span className={classes.leading} aria-hidden="true">
            {leading}
          </span>
        ) : null}
        <span className={classes.label}>{children}</span>
        {trailing != null ? <span className={classes.trailing}>{trailing}</span> : null}
        {!disabled ? <Ripple /> : null}
      </>
    );

    if (href != null) {
      const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          href={disabled ? undefined : href}
          aria-current={selected ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          data-selected={selected ? '' : undefined}
          data-disabled={disabled ? '' : undefined}
          tabIndex={disabled ? -1 : anchorProps.tabIndex}
        >
          {inner}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cls}
        disabled={disabled}
        aria-current={selected ? 'page' : undefined}
        data-selected={selected ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    );
  });
  Item.displayName = 'M3NavigationDrawer.Item';

  return { Root, Headline, Item };
}
