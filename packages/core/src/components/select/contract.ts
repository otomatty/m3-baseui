/**
 * select.contract.ts — slot classes for the M3 Select.
 */
import type * as React from 'react';

export interface SelectClasses {
  trigger: string;
  value: string;
  icon: string;
  popup: string;
  item: string;
  itemIndicator: string;
  groupLabel: string;
}

/**
 * Exposed Dropdown Menu — the M3 pattern where the Select anchor is a TextField
 * (outlined / filled) with a floating label, supporting text and a trailing
 * dropdown icon. `Select.Field` wraps `Select.Root` in Base UI `Field.Root`, so
 * the trigger participates as the field control and carries the same
 * `data-focused` / `data-filled` / `data-invalid` state as the standalone
 * TextField. Both variants mirror the TextField, so the two engines emit
 * identical DOM + `data-*` (drop-in compatible).
 */
export const SELECT_FIELD_VARIANTS = ['filled', 'outlined'] as const;
export type SelectFieldVariant = (typeof SELECT_FIELD_VARIANTS)[number];

export interface SelectFieldResolverArgs {
  variant: SelectFieldVariant;
}

export interface SelectFieldSlotClasses {
  /** Field.Root — outer flex column (also carries the `group` hook). */
  root: string;
  /** The filled / outlined box (applied to the Select.Trigger button). */
  field: string;
  /** Relative wrapper around the value + floating label. */
  inputWrap: string;
  /** Select.Value — the selected item text. */
  value: string;
  /** Select.Label — the floating label. */
  label: string;
  /** Trailing dropdown icon (arrow_drop_down + rotate on open). */
  icon: string;
  /** Leading icon container (decorative). */
  leadingIcon: string;
  /** Row under the box holding the supporting text. */
  supporting: string;
  /** Field.Description — the supporting / error text. */
  supportingText: string;
}

export type SelectFieldClassResolver = (args: SelectFieldResolverArgs) => SelectFieldSlotClasses;

export interface SelectFieldOwnProps {
  /** M3 exposed-dropdown anchor variant. @default 'outlined' */
  variant?: SelectFieldVariant;
  /** Floating label (rendered as the M3 exposed-dropdown label). */
  label?: React.ReactNode;
  /** Helper text shown beneath the anchor (error color when invalid). */
  supportingText?: React.ReactNode;
  /** Mark the field invalid (error color + `data-invalid`). */
  error?: boolean;
  /** Leading icon (decorative). */
  leadingIcon?: React.ReactNode;
  /** Placeholder shown in the value slot when nothing is selected. */
  placeholder?: React.ReactNode;
  /** Override the trailing dropdown glyph (defaults to `arrow_drop_down`). */
  icon?: React.ReactNode;
  /** className applied to the Field.Root wrapper. */
  className?: string;
  /** className applied to the styled trigger box. */
  triggerClassName?: string;
  /** Popup content — `Select.Portal` / `Positioner` / `Popup` / `Item`s. */
  children?: React.ReactNode;
}
