/**
 * textfield.ts — tailwind-variants slots for the M3 TextField.
 *
 * 56dp tall. The floating label and focus/filled border key off Field's
 * `data-focused` / `data-filled` / `data-invalid` via the `group` on Root.
 * Filled = surface-container-highest with a bottom indicator; outlined = a
 * border that thickens to 3dp primary on focus (M3 focus-outline-width). Same
 * DOM as the VE build.
 */
import { createTextField } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

const iconVisual =
  'inline-flex items-center justify-center shrink-0 text-on-surface-variant [&>svg]:size-6';

export const textFieldTv = tv({
  slots: {
    root: 'flex flex-col gap-1 min-w-[210px]',
    field: [
      'relative flex items-stretch gap-3 h-14 px-4 box-border text-on-surface',
      'transition-[border-color,padding] duration-150 ease-standard',
      'group-data-[disabled]:opacity-[0.38] group-data-[disabled]:pointer-events-none',
    ],
    inputWrap: 'relative z-0 flex-1 flex items-center min-w-0 overflow-visible',
    input: [
      'peer w-full bg-transparent outline-none border-0 p-0 text-body-large text-on-surface',
      'placeholder:text-on-surface-variant',
    ],
    label: [
      'absolute left-0 pointer-events-none origin-left',
      'top-1/2 -translate-y-1/2 text-body-large text-on-surface-variant',
      'transition-all duration-150 ease-standard',
      'group-data-[focused]:text-primary group-data-[invalid]:text-error',
    ],
    leadingIcon: iconVisual,
    trailingIcon: iconVisual,
    leadingIconButton: [
      iconVisual,
      'relative size-12 p-0 border-0 bg-transparent cursor-pointer',
      'group-data-[disabled]:pointer-events-none',
    ],
    trailingIconButton: [
      iconVisual,
      'relative size-12 p-0 border-0 bg-transparent cursor-pointer',
      'group-data-[disabled]:pointer-events-none',
    ],
    supporting: [
      'flex justify-between gap-4 px-4 text-body-small text-on-surface-variant',
      'group-data-[invalid]:text-error',
    ],
    supportingText: 'min-w-0',
    counter: 'shrink-0 tabular-nums',
  },
  variants: {
    variant: {
      filled: {
        field: [
          'overflow-hidden rounded-t-extra-small bg-surface-container-highest',
          // M3 filled hover: state layer (on-surface × state-hover) + indicator color.
          'before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:pointer-events-none',
          'before:transition-opacity before:duration-100',
          'hover:before:opacity-[var(--md-sys-state-hover)]',
          'group-data-[disabled]:before:opacity-0',
          // M3 filled resting active-indicator: 1dp on-surface-variant.
          'border-b border-on-surface-variant hover:border-on-surface',
          // M3 filled focus-active-indicator-height is 3dp.
          'group-data-[focused]:border-b-[3px] group-data-[focused]:border-primary group-data-[invalid]:border-error',
        ],
        input: 'pt-3',
        label: [
          'group-data-[focused]:top-1.5 group-data-[focused]:translate-y-0 group-data-[focused]:text-body-small',
          'group-data-[filled]:top-1.5 group-data-[filled]:translate-y-0 group-data-[filled]:text-body-small',
        ],
      },
      outlined: {
        field: [
          // Outlined hover = outline color only (no container state layer per M3).
          'overflow-visible rounded-extra-small border border-outline hover:border-on-surface',
          // M3 outlined focus-outline-width is 3dp (matches Select's trigger);
          // padding drops 2px so content stays steady as the 1dp border grows.
          'group-data-[focused]:border-[3px] group-data-[focused]:border-primary group-data-[focused]:px-[14px]',
          'group-data-[invalid]:border-error',
        ],
        label: [
          'group-data-[focused]:top-0 group-data-[focused]:-translate-y-1/2 group-data-[focused]:z-[1]',
          'group-data-[focused]:text-body-small group-data-[focused]:bg-surface group-data-[focused]:px-1 group-data-[focused]:leading-none',
          'group-data-[filled]:top-0 group-data-[filled]:-translate-y-1/2 group-data-[filled]:z-[1]',
          'group-data-[filled]:text-body-small group-data-[filled]:bg-surface group-data-[filled]:px-1 group-data-[filled]:leading-none',
        ],
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export const TextField = createTextField(({ variant }) => {
  const c = textFieldTv({ variant });
  return {
    root: c.root(),
    field: c.field(),
    inputWrap: c.inputWrap(),
    input: c.input(),
    label: c.label(),
    leadingIcon: c.leadingIcon(),
    trailingIcon: c.trailingIcon(),
    leadingIconButton: c.leadingIconButton(),
    trailingIconButton: c.trailingIconButton(),
    supporting: c.supporting(),
    supportingText: c.supportingText(),
    counter: c.counter(),
  };
});

export type { TextFieldIconAction, TextFieldProps, TextFieldVariant } from '@m3-baseui/core';
