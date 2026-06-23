/**
 * textfield.ts — wires the VE styles into the shared TextField factory.
 */
import { createTextField, cx } from '@otomatty/core';
import * as s from './textfield.css';

export const TextField = createTextField(({ variant }) => ({
  root: s.root,
  field: cx(s.field, s.fieldVariant[variant]),
  inputWrap: s.inputWrap,
  input: cx(s.input, s.inputVariant[variant]),
  label: cx(s.label, s.labelVariant[variant]),
  leadingIcon: s.icon,
  trailingIcon: s.icon,
  supporting: s.supporting,
  supportingText: s.supportingText,
  counter: s.counter,
}));

export type { TextFieldProps, TextFieldVariant } from '@otomatty/core';
