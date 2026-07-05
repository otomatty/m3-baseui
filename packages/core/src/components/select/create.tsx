'use client';
/**
 * create-select.tsx — headless M3 Select parts.
 *
 * Base UI Select composition exposed as a namespace. The Trigger is styled as an
 * M3 outlined field; the Popup is an M3 menu surface (112–280dp, at least anchor
 * width) positioned below the anchor (no trigger overlap). Selectable items use label-large, secondary-container fill when
 * selected, and a leading check (on-secondary-container when selected). Scroll
 * arrows are sticky affordances when the list overflows.
 */
import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { Field } from '@base-ui/react/field';

import type { SelectClasses, SelectFieldClassResolver, SelectFieldOwnProps } from './contract';
import { assignListItemPositions } from '../../menu-list-position';
import { createSlot, mergeClassName, type ClassValue } from '../../slot';

/** Default chevron glyphs for the scroll arrows. */
function Chevron({ up }: { up?: boolean }): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d={up ? 'M7 14l5-5 5 5z' : 'M7 10l5 5 5-5z'} />
    </svg>
  );
}

/** Default trailing dropdown glyph (M3 `arrow_drop_down`). */
function ArrowDropDown(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="currentColor" d="M7 10l5 5 5-5z" />
    </svg>
  );
}

type ScrollUpProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpArrow>;
type ScrollDownProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownArrow>;
type PositionerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Positioner>;
type SelectPopupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Popup>;

type SelectRootProps = React.ComponentProps<typeof SelectPrimitive.Root>;
/** `Select.Field` props: field styling + the forwarded `Select.Root` props. */
export type SelectFieldProps = SelectFieldOwnProps &
  Omit<SelectRootProps, 'children' | 'className'>;

/**
 * Build the M3 Select namespace (outlined Trigger, menu-surface Popup, Items,
 * scroll arrows) bound to one engine's slot classes.
 *
 * The `field` resolver powers the composed `Select.Field` part — the M3
 * Exposed Dropdown Menu, i.e. the Select anchored to a TextField (floating
 * label + supporting text + trailing dropdown icon). The standalone
 * `Select.Trigger` stays available for the bare combobox.
 *
 * @param classes - Engine-resolved class strings for each select slot.
 * @param field - Variant-aware resolver for the exposed-dropdown anchor.
 * @returns A namespace of Base UI select parts wrapped with M3 styling + ripple.
 */
export function createSelect(classes: SelectClasses, field: SelectFieldClassResolver) {
  // Scroll arrows carry a default chevron when the caller supplies no children.
  /** Sticky top scroll affordance; renders a default up-chevron when empty. */
  const ScrollUpArrow = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpArrow>,
    ScrollUpProps
  >(function ScrollUpArrow({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.ScrollUpArrow
        ref={ref}
        className={mergeClassName(classes.scrollUpArrow, className as ClassValue)}
        {...props}
      >
        {children ?? <Chevron up />}
      </SelectPrimitive.ScrollUpArrow>
    );
  });
  ScrollUpArrow.displayName = 'M3Select.ScrollUpArrow';

  /** Sticky bottom scroll affordance; renders a default down-chevron when empty. */
  const ScrollDownArrow = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownArrow>,
    ScrollDownProps
  >(function ScrollDownArrow({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.ScrollDownArrow
        ref={ref}
        className={mergeClassName(classes.scrollDownArrow, className as ClassValue)}
        {...props}
      >
        {children ?? <Chevron />}
      </SelectPrimitive.ScrollDownArrow>
    );
  });
  ScrollDownArrow.displayName = 'M3Select.ScrollDownArrow';

  /**
   * Positions the menu below the anchor without overlapping it. Base UI Select
   * defaults to `alignItemWithTrigger` (native-select text alignment); M3 Menus
   * and Exposed Dropdown Menus detach the surface under the anchor instead.
   */
  const Positioner = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Positioner>,
    PositionerProps
  >(function Positioner(
    { alignItemWithTrigger = false, side = 'bottom', sideOffset = 4, align = 'start', ...props },
    ref,
  ) {
    return (
      <SelectPrimitive.Positioner
        ref={ref}
        alignItemWithTrigger={alignItemWithTrigger}
        side={side}
        sideOffset={sideOffset}
        align={align}
        {...props}
      />
    );
  });
  Positioner.displayName = 'M3Select.Positioner';

  /**
   * Exposed Dropdown Menu anchor: the Select rendered as a TextField. Wraps
   * `Select.Root` in `Field.Root` so the trigger becomes the field control
   * (carrying `data-focused` / `data-filled` / `data-invalid`), styles the
   * trigger as the M3 outlined/filled box, and exposes the floating label and
   * supporting text via Base UI Field for a11y. Popup content is passed as
   * `children` and rendered inside `Select.Root`.
   */
  const SelectFieldComponent = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
    function SelectField(
      {
        variant = 'outlined',
        label,
        supportingText,
        error = false,
        leadingIcon,
        placeholder,
        icon,
        className,
        triggerClassName,
        disabled,
        children,
        ...rootProps
      },
      ref,
    ) {
      const c = field({ variant });
      return (
        <Field.Root
          className={mergeClassName(c.root, className as ClassValue)}
          disabled={disabled}
          // Drive Base UI Field's invalid state so data-invalid propagates to
          // the Select trigger (the field control), not just the Root node.
          invalid={error || undefined}
        >
          <SelectPrimitive.Root disabled={disabled} {...rootProps}>
            <SelectPrimitive.Trigger
              ref={ref}
              className={mergeClassName(c.field, triggerClassName as ClassValue)}
              // A placeholder needs the label floated even at rest, otherwise the
              // resting label paints over the placeholder text (they share the
              // value slot). The float styling keys off this hook.
              data-has-placeholder={placeholder != null ? '' : undefined}
            >
              {leadingIcon != null ? (
                <span className={c.leadingIcon} aria-hidden="true" data-slot="select-leading-icon">
                  {leadingIcon}
                </span>
              ) : null}
              <span className={c.inputWrap}>
                <SelectPrimitive.Value className={c.value} placeholder={placeholder} />
                {label != null ? (
                  // Base UI Select.Label associates with the trigger via
                  // aria-labelledby. Render it as a <span> (phrasing content) so
                  // the button subtree stays valid — a <div> would be reparented
                  // during hydration and desync the styled structure.
                  <SelectPrimitive.Label render={<span />} className={c.label}>
                    {label}
                  </SelectPrimitive.Label>
                ) : null}
              </span>
              <SelectPrimitive.Icon className={c.icon} data-slot="select-icon">
                {icon ?? <ArrowDropDown />}
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            {children}
          </SelectPrimitive.Root>
          {supportingText != null ? (
            <div className={c.supporting}>
              <Field.Description className={c.supportingText}>{supportingText}</Field.Description>
            </div>
          ) : null}
        </Field.Root>
      );
    },
  );
  SelectFieldComponent.displayName = 'M3Select.Field';

  const Item = createSlot(SelectPrimitive.Item, classes.item, { ripple: true });
  const Popup = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Popup>, SelectPopupProps>(
    function Popup({ className, children, ...props }, ref) {
      const positionedChildren = assignListItemPositions(children, (child) => child.type === Item, {
        shouldRecurseInto: (child) => child.type === SelectPrimitive.Group,
      });
      return (
        <SelectPrimitive.Popup
          ref={ref}
          className={mergeClassName(classes.popup, className as ClassValue)}
          {...props}
        >
          {positionedChildren}
        </SelectPrimitive.Popup>
      );
    },
  );
  Popup.displayName = 'M3Select.Popup';

  return {
    Root: SelectPrimitive.Root,
    /** Exposed Dropdown Menu anchor (TextField + Select). */
    Field: SelectFieldComponent,
    /** Standalone floating label part (kept for parity with Base UI Select). */
    Label: SelectPrimitive.Label,
    Trigger: createSlot(SelectPrimitive.Trigger, classes.trigger),
    Value: createSlot(SelectPrimitive.Value, classes.value),
    Icon: createSlot(SelectPrimitive.Icon, classes.icon),
    Portal: SelectPrimitive.Portal,
    Positioner,
    Popup,
    List: SelectPrimitive.List,
    Item,
    ItemText: SelectPrimitive.ItemText,
    // keepMounted so the 24px indicator column stays populated on every item
    // (labels align); the check glyph is hidden via CSS unless the item is selected.
    ItemIndicator: createSlot(SelectPrimitive.ItemIndicator, classes.itemIndicator, {
      defaultProps: { keepMounted: true },
    }),
    ScrollUpArrow,
    ScrollDownArrow,
    Group: SelectPrimitive.Group,
    GroupLabel: createSlot(SelectPrimitive.GroupLabel, classes.groupLabel),
  };
}
