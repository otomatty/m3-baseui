/**
 * textfield.contract.ts — variant set, slot classes and props for the M3 TextField.
 *
 * Two M3 variants (filled / outlined). The component composes Base UI `Field`
 * parts, so the floating label, supporting text and error state are driven by
 * Field's `data-focused` / `data-filled` / `data-invalid` / `data-disabled`
 * attributes (read off the Root, which carries the `group` class). The class
 * resolver returns one string per slot so both engines stay drop-in compatible.
 */
import type * as React from 'react';

export const TEXT_FIELD_VARIANTS = ['filled', 'outlined'] as const;
export type TextFieldVariant = (typeof TEXT_FIELD_VARIANTS)[number];

export interface TextFieldResolverArgs {
  variant: TextFieldVariant;
}

export interface TextFieldSlotClasses {
  /** Field.Root — outer flex column (also carries the `group` hook). */
  root: string;
  /** The filled / outlined box holding icons, input and floating label. */
  field: string;
  /** Relative wrapper around the input + label (so the label tracks the input). */
  inputWrap: string;
  /** Field.Control — the native input. */
  input: string;
  /** Field.Label — the floating label. */
  label: string;
  /** Leading icon container. */
  leadingIcon: string;
  /** Trailing icon container. */
  trailingIcon: string;
  /** Row under the box (supporting text + counter). */
  supporting: string;
  /** Field.Description / error message. */
  supportingText: string;
  /** Character counter. */
  counter: string;
}

export type TextFieldClassResolver = (args: TextFieldResolverArgs) => TextFieldSlotClasses;

export interface TextFieldOwnProps {
  /** M3 text field variant. @default 'filled' */
  variant?: TextFieldVariant;
  /** Floating label. */
  label?: React.ReactNode;
  /** Helper text shown beneath the field (replaced by error color when invalid). */
  supportingText?: React.ReactNode;
  /** Mark the field invalid (error color + `aria-invalid` + `data-invalid`). */
  error?: boolean;
  /** Leading icon. */
  leadingIcon?: React.ReactNode;
  /** Trailing icon. */
  trailingIcon?: React.ReactNode;
  /** Show a `current/maxLength` character counter (requires `maxLength`). */
  showCounter?: boolean;
  /** className applied to the inner input. */
  inputClassName?: string;
}

export type TextFieldProps = TextFieldOwnProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;
