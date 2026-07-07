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

export interface TextFieldIconAction {
  /** Accessible name for the icon control (required when interactive). */
  'aria-label': string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface TextFieldResolverArgs {
  variant: TextFieldVariant;
  /** Multi-line text area (renders a `<textarea>`); drives layout/height styles. */
  multiline: boolean;
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
  /** Leading icon container (decorative). */
  leadingIcon: string;
  /** Trailing icon container (decorative). */
  trailingIcon: string;
  /** Leading icon button shell (48dp touch target). */
  leadingIconButton: string;
  /** Trailing icon button shell (48dp touch target). */
  trailingIconButton: string;
  /** Row under the box (supporting text + counter). */
  supporting: string;
  /** Field.Description / error message. */
  supportingText: string;
  /** Character counter. */
  counter: string;
}

export type TextFieldClassResolver = (args: TextFieldResolverArgs) => TextFieldSlotClasses;

/** M3-specific props shared by the single-line and multiline text field. */
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
  /** When set, renders `leadingIcon` as a 48dp icon button. */
  leadingIconAction?: TextFieldIconAction;
  /** When set, renders `trailingIcon` as a 48dp icon button. */
  trailingIconAction?: TextFieldIconAction;
  /** Show a `current/maxLength` character counter (requires `maxLength`). */
  showCounter?: boolean;
  /** className applied to the inner input/textarea. */
  inputClassName?: string;
}

/** Single-line text field — renders a native `<input>`. */
export type TextFieldInputProps = TextFieldOwnProps & {
  /** @default false */
  multiline?: false;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

/** Multi-line M3 text area — renders a native `<textarea>`. */
export type TextFieldTextareaProps = TextFieldOwnProps & {
  /** Render as a multi-line text area (M3 textarea). */
  multiline: true;
  /** Initial visible rows. @default 2 */
  rows?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;

/**
 * Discriminated on `multiline`: the single-line branch carries `<input>` types,
 * the multiline branch carries `<textarea>` types (textarea change events and
 * props such as `rows` / `wrap` / `cols`), so consumers of either path stay
 * fully typed.
 */
export type TextFieldProps = TextFieldInputProps | TextFieldTextareaProps;
