/**
 * select.ts — wires the VE styles into the shared parts factory.
 */
import { createSelect, cx } from '@m3-baseui/core';
import {
  trigger,
  value,
  icon,
  popup,
  item,
  itemIndicator,
  groupLabel,
  scrollUpArrow,
  scrollDownArrow,
  fieldRoot,
  field,
  fieldVariant,
  fieldInputWrap,
  fieldValue,
  fieldValueVariant,
  fieldLabel,
  fieldLabelVariant,
  fieldIcon,
  fieldLeadingIcon,
  fieldSupporting,
  fieldSupportingText,
} from './select.css';

export const Select = createSelect(
  {
    trigger,
    value,
    icon,
    popup,
    item,
    itemIndicator,
    groupLabel,
    scrollUpArrow,
    scrollDownArrow,
  },
  // Exposed Dropdown Menu anchor (issue #96): the field state lives on the
  // trigger, so the label float / focus border resolve via `${field}[data-*]`.
  ({ variant }) => ({
    root: fieldRoot,
    field: cx(field, fieldVariant[variant]),
    inputWrap: fieldInputWrap,
    value: cx(fieldValue, fieldValueVariant[variant]),
    label: cx(fieldLabel, fieldLabelVariant[variant]),
    icon: fieldIcon,
    leadingIcon: fieldLeadingIcon,
    supporting: fieldSupporting,
    supportingText: fieldSupportingText,
  }),
);

export type { SelectFieldProps } from '@m3-baseui/core';
