/**
 * textfield.ts — wires the VE styles into the shared TextField factory.
 */
import { createTextField, cx } from '@m3-baseui/core';
import * as s from './textfield.css';

export const TextField = createTextField(({ variant, multiline }) => {
  const layout = multiline ? 'multi' : 'single';
  return {
    root: s.root,
    field: cx(s.field, s.fieldVariant[variant], s.fieldLayout[layout]),
    inputWrap: cx(s.inputWrap, s.inputWrapLayout[layout]),
    input: multiline
      ? cx(s.input, s.inputMultiBase, s.inputMulti[variant])
      : cx(s.input, s.inputVariant[variant]),
    label: multiline
      ? cx(s.label, s.labelVariant[variant], s.labelMulti[variant])
      : cx(s.label, s.labelVariant[variant]),
    leadingIcon: s.icon,
    trailingIcon: s.icon,
    leadingIconButton: s.iconButton,
    trailingIconButton: s.iconButton,
    supporting: s.supporting,
    supportingText: s.supportingText,
    counter: s.counter,
  };
});

export type { TextFieldIconAction, TextFieldProps, TextFieldVariant } from '@m3-baseui/core';
