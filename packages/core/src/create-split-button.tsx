'use client';
/**
 * create-split-button.tsx — headless M3 SplitButton parts.
 *
 * `Root` is a Base UI `Menu.Root` (owns the open state); `Group` is the
 * `role="group"` container; `Leading` is the primary-action `<button>`; and
 * `Trailing` is a `Menu.Trigger` that reveals the dropdown (a default chevron
 * rotates via `data-popup-open`). The dropdown reuses Base UI Menu parts. Roles,
 * keyboard navigation and the `data-*` contract are delegated to Base UI, so
 * both engines stay drop-in compatible by swapping only the class strings.
 */
import * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import type {
  SplitButtonClasses,
  SplitButtonLeadingOwnProps,
  SplitButtonTrailingOwnProps,
} from './split-button.contract';
import { createSlot, mergeClassName } from './slot';
import { cx } from './utils';
import { Ripple } from './ripple/Ripple';

export type SplitButtonLeadingProps = SplitButtonLeadingOwnProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
export type SplitButtonTrailingProps = SplitButtonTrailingOwnProps &
  Omit<React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>, 'color'>;

/** Default trailing chevron; rotation is driven by the engine's chevron class. */
function Chevron({ className }: { className: string }): React.JSX.Element {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M7 10l5 5 5-5z" />
      </svg>
    </span>
  );
}

/**
 * Build the M3 SplitButton namespace bound to one engine's class strings.
 *
 * @param classes - Engine-resolved group/leading/trailing/chevron + dropdown classes.
 * @returns A namespace of parts wrapped with M3 styling + ripple.
 */
export function createSplitButton(classes: SplitButtonClasses) {
  const Group = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function Group({ className, ...props }, ref) {
      return (
        // biome-ignore lint/a11y/useSemanticElements: M3 split button is a pair of buttons, not a form fieldset; role=group is the correct ARIA.
        <div ref={ref} role="group" className={cx(classes.group, className)} {...props} />
      );
    },
  );
  Group.displayName = 'M3SplitButton.Group';

  const Leading = React.forwardRef<HTMLButtonElement, SplitButtonLeadingProps>(function Leading(
    { variant = 'filled', ripple = true, type = 'button', className, children, ...rest },
    ref,
  ) {
    return (
      <button ref={ref} type={type} className={cx(classes.leading(variant), className)} {...rest}>
        {children}
        {ripple ? <Ripple /> : null}
      </button>
    );
  });
  Leading.displayName = 'M3SplitButton.Leading';

  const Trailing = React.forwardRef<HTMLButtonElement, SplitButtonTrailingProps>(function Trailing(
    { variant = 'filled', ripple = true, className, children, ...rest },
    ref,
  ) {
    return (
      <MenuPrimitive.Trigger
        ref={ref}
        className={mergeClassName(classes.trailing(variant), className)}
        {...rest}
      >
        {children ?? <Chevron className={classes.chevron} />}
        {ripple ? <Ripple /> : null}
      </MenuPrimitive.Trigger>
    );
  });
  Trailing.displayName = 'M3SplitButton.Trailing';

  return {
    Root: MenuPrimitive.Root,
    Group,
    Leading,
    Trailing,
    Portal: MenuPrimitive.Portal,
    Positioner: MenuPrimitive.Positioner,
    Popup: createSlot(MenuPrimitive.Popup, classes.popup),
    Item: createSlot(MenuPrimitive.Item, classes.item, { ripple: true }),
  };
}
