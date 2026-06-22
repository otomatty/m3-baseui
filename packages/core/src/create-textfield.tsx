'use client';
/**
 * create-textfield.tsx — headless M3 TextField factory.
 *
 * Composes Base UI `Field` (Root / Control / Label / Description) into one
 * component. The floating label and the focus/filled border are pure CSS keyed
 * off Field's `data-focused` / `data-filled` / `data-invalid` on the Root (which
 * carries the `group` hook). Each engine injects its slot classes, so the DOM
 * and `data-*` state are identical between builds.
 */
import * as React from 'react';
import { Field } from '@base-ui/react/field';

import type { TextFieldClassResolver, TextFieldProps } from './textfield.contract';
import { cx } from './utils';

export function createTextField(resolve: TextFieldClassResolver) {
  function TextField(
    {
      variant = 'filled',
      label,
      supportingText,
      error = false,
      leadingIcon,
      trailingIcon,
      showCounter = false,
      maxLength,
      className,
      inputClassName,
      id,
      value,
      defaultValue,
      onChange,
      disabled,
      ...rest
    }: TextFieldProps,
    forwardedRef: React.Ref<HTMLInputElement>,
  ): React.JSX.Element {
    const c = resolve({ variant });
    const reactId = React.useId();
    const inputId = id ?? reactId;

    // When controlled, derive the count from `value` so external changes (form
    // reset, async prefill, normalization) stay in sync; otherwise track it
    // locally and update on input.
    const isControlled = value !== undefined;
    const [uncontrolledCount, setUncontrolledCount] = React.useState(
      () => String(defaultValue ?? '').length,
    );
    const count = isControlled ? String(value ?? '').length : uncontrolledCount;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolledCount(event.target.value.length);
      onChange?.(event);
    };

    const showSupporting = supportingText != null || (showCounter && maxLength != null);

    return (
      <Field.Root
        className={cx('group', c.root, className)}
        disabled={disabled}
        {...(error ? { 'data-invalid': '' } : {})}
      >
        <div className={c.field}>
          {leadingIcon ? (
            <span className={c.leadingIcon} aria-hidden="true">
              {leadingIcon}
            </span>
          ) : null}
          <span className={c.inputWrap}>
            <Field.Control
              ref={forwardedRef}
              id={inputId}
              className={cx(c.input, inputClassName)}
              value={value as string | number | readonly string[] | undefined}
              defaultValue={defaultValue as string | number | readonly string[] | undefined}
              onChange={handleChange}
              maxLength={maxLength}
              aria-invalid={error || undefined}
              {...rest}
            />
            {label != null ? (
              <Field.Label htmlFor={inputId} className={c.label}>
                {label}
              </Field.Label>
            ) : null}
          </span>
          {trailingIcon ? (
            <span className={c.trailingIcon} aria-hidden="true">
              {trailingIcon}
            </span>
          ) : null}
        </div>
        {showSupporting ? (
          <div className={c.supporting}>
            <Field.Description className={c.supportingText}>{supportingText}</Field.Description>
            {showCounter && maxLength != null ? (
              <span className={c.counter}>
                {count}/{maxLength}
              </span>
            ) : null}
          </div>
        ) : null}
      </Field.Root>
    );
  }

  const Forwarded = React.forwardRef(TextField);
  Forwarded.displayName = 'M3TextField';
  return Forwarded;
}
