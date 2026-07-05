/**
 * select.ts — Tailwind classes for the M3 Select.
 *
 * Trigger = outlined field (56dp; 3dp primary border when open/focused, per the
 * M3 outlined-field focus-outline-width). Popup = M3 menu surface sized to the
 * anchor, clamped to the M3 menu 112–280dp bounds. Selectable items use
 * label-large, a leading check (on-surface; on-secondary-container when
 * selected), and secondary-container fill on the selected row. Same DOM as VE.
 *
 * Disabled follows the M3 outlined-field per-token opacities (not a blanket
 * fade): outline on-surface/0.12, label/value + icon on-surface/0.38.
 */
import { createSelect } from '@m3-baseui/core';
import { tv } from '../../tv';

export const selectTv = tv({
  slots: {
    trigger: [
      'group relative inline-flex items-center justify-between gap-2 box-border',
      'h-14 min-w-[200px] px-4 rounded-extra-small border border-outline bg-transparent',
      'text-on-surface text-body-large cursor-pointer outline-none text-left',
      'transition-colors duration-150 ease-standard',
      // focus/open = 3dp primary outline; padding drops 2px to keep content steady
      'data-[popup-open]:border-primary data-[popup-open]:border-[3px] data-[popup-open]:px-[14px]',
      'focus-visible:border-primary focus-visible:border-[3px] focus-visible:px-[14px]',
      'data-[disabled]:border-on-surface/[0.12] data-[disabled]:text-on-surface/[0.38] data-[disabled]:pointer-events-none',
    ],
    value: 'flex-1 truncate',
    icon: 'flex text-on-surface-variant transition-transform duration-150 group-data-[popup-open]:rotate-180 group-data-[disabled]:text-on-surface/[0.38]',
    popup: [
      'min-w-[max(112px,var(--anchor-width))] max-w-[280px] max-h-[var(--available-height)] py-2 overflow-auto',
      'bg-surface-container text-on-surface rounded-extra-small shadow-level2',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0',
      'focus:outline-none',
    ],
    item: [
      'group relative grid grid-cols-[24px_1fr_auto] items-center gap-3 h-12 px-3 overflow-hidden',
      'cursor-pointer select-none outline-none text-label-large text-on-surface',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      // M3 selectable menu item: secondary-container fill + on-secondary-container label.
      'data-[selected]:bg-secondary-container data-[selected]:text-on-secondary-container data-[selected]:rounded-extra-small',
      // M3 disabled (per-token, not a blanket fade): label + trailing supporting
      // text on-surface/0.38, no state layer.
      'data-[disabled]:text-on-surface/[0.38] data-[disabled]:before:opacity-0 data-[disabled]:pointer-events-none',
      'data-[disabled]:[&_[data-slot=select-trailing]]:text-on-surface/[0.38]',
      // M3 trailing supporting text (e.g. meta) sits in the last column.
      '[&_[data-slot=select-trailing]]:pl-4 [&_[data-slot=select-trailing]]:text-label-large [&_[data-slot=select-trailing]]:text-on-surface-variant',
      'data-[selected]:[&_[data-slot=select-trailing]]:text-on-secondary-container',
    ],
    itemIndicator:
      'inline-flex items-center justify-center text-on-surface invisible group-data-[selected]:visible group-data-[selected]:text-on-secondary-container group-data-[disabled]:text-on-surface/[0.38]',
    groupLabel: 'px-3 py-2 text-label-small text-on-surface-variant',
    // Sticky scroll affordances at the popup edges; surface-tinted with a chevron.
    scrollUpArrow: [
      'sticky top-0 z-[1] flex items-center justify-center h-6 cursor-default',
      'bg-surface-container text-on-surface-variant [&>svg]:size-5',
    ],
    scrollDownArrow: [
      'sticky bottom-0 z-[1] flex items-center justify-center h-6 cursor-default',
      'bg-surface-container text-on-surface-variant [&>svg]:size-5',
    ],
  },
});

/**
 * Exposed Dropdown Menu anchor (issue #96): the Select rendered as an M3
 * TextField. The floating label, focus/filled border and trailing dropdown
 * icon key off the trigger's own field state — Base UI stamps `data-focused` /
 * `data-filled` / `data-invalid` / `data-popup-open` on the trigger (the
 * `group/field`) once it sits inside `Field.Root`. Mirrors the standalone
 * TextField so the anchor reads identically. Same DOM as the VE build.
 */
export const selectFieldTv = tv({
  slots: {
    // The `group` hook lives here (not in engine-neutral core): supporting text
    // keys its error color off Field.Root's `group-data-[invalid]`.
    root: 'group flex flex-col gap-1 min-w-[210px]',
    field: [
      'group/field relative flex items-stretch gap-3 h-14 px-4 box-border w-full',
      'text-on-surface text-body-large cursor-pointer text-left outline-none',
      'transition-[border-color,padding] duration-150 ease-standard',
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
    ],
    inputWrap: 'relative z-0 flex-1 flex items-center min-w-0 overflow-visible',
    value: 'flex-1 truncate text-body-large text-on-surface',
    label: [
      'absolute left-0 pointer-events-none origin-left',
      'top-1/2 -translate-y-1/2 text-body-large text-on-surface-variant',
      'transition-all duration-150 ease-standard',
      'group-data-[focused]/field:text-primary group-data-[invalid]/field:text-error',
    ],
    icon: [
      // Disabled dimming comes from the field's own opacity (0.38); no per-icon
      // color override here, else it would compound to ~0.14.
      'flex items-center text-on-surface-variant transition-transform duration-150 [&>svg]:size-6',
      'group-data-[popup-open]/field:rotate-180',
    ],
    leadingIcon:
      'inline-flex items-center justify-center shrink-0 text-on-surface-variant [&>svg]:size-6',
    supporting: [
      'flex justify-between gap-4 px-4 text-body-small text-on-surface-variant',
      'group-data-[invalid]:text-error',
    ],
    supportingText: 'min-w-0',
  },
  variants: {
    variant: {
      filled: {
        field: [
          'overflow-hidden rounded-t-extra-small bg-surface-container-highest',
          // M3 filled hover: state layer (on-surface × state-hover).
          'before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:pointer-events-none',
          'before:transition-opacity before:duration-100',
          'hover:before:opacity-[var(--md-sys-state-hover)]',
          'data-[disabled]:before:opacity-0',
          // M3 filled resting active-indicator: 1dp on-surface-variant.
          'border-b border-on-surface-variant hover:border-on-surface',
          // M3 filled focus-active-indicator-height is 3dp.
          'data-[focused]:border-b-[3px] data-[focused]:border-primary',
          'data-[popup-open]:border-b-[3px] data-[popup-open]:border-primary',
          'data-[invalid]:border-error',
        ],
        value: 'pt-3',
        label: [
          'group-data-[focused]/field:top-1.5 group-data-[focused]/field:translate-y-0 group-data-[focused]/field:text-body-small',
          'group-data-[filled]/field:top-1.5 group-data-[filled]/field:translate-y-0 group-data-[filled]/field:text-body-small',
          'group-data-[popup-open]/field:top-1.5 group-data-[popup-open]/field:translate-y-0 group-data-[popup-open]/field:text-body-small',
          'group-data-[has-placeholder]/field:top-1.5 group-data-[has-placeholder]/field:translate-y-0 group-data-[has-placeholder]/field:text-body-small',
        ],
      },
      outlined: {
        field: [
          'overflow-visible rounded-extra-small border border-outline hover:border-on-surface',
          // M3 outlined focus-outline-width is 3dp; padding drops 2px so content
          // stays steady as the 1dp border grows (matches the TextField anchor).
          'data-[focused]:border-[3px] data-[focused]:border-primary data-[focused]:px-[14px]',
          'data-[popup-open]:border-[3px] data-[popup-open]:border-primary data-[popup-open]:px-[14px]',
          'data-[invalid]:border-error',
        ],
        label: [
          'group-data-[focused]/field:top-0 group-data-[focused]/field:-translate-y-1/2 group-data-[focused]/field:z-[1] group-data-[focused]/field:text-body-small group-data-[focused]/field:bg-surface group-data-[focused]/field:px-1 group-data-[focused]/field:leading-none',
          'group-data-[filled]/field:top-0 group-data-[filled]/field:-translate-y-1/2 group-data-[filled]/field:z-[1] group-data-[filled]/field:text-body-small group-data-[filled]/field:bg-surface group-data-[filled]/field:px-1 group-data-[filled]/field:leading-none',
          'group-data-[popup-open]/field:top-0 group-data-[popup-open]/field:-translate-y-1/2 group-data-[popup-open]/field:z-[1] group-data-[popup-open]/field:text-body-small group-data-[popup-open]/field:bg-surface group-data-[popup-open]/field:px-1 group-data-[popup-open]/field:leading-none',
          'group-data-[has-placeholder]/field:top-0 group-data-[has-placeholder]/field:-translate-y-1/2 group-data-[has-placeholder]/field:z-[1] group-data-[has-placeholder]/field:text-body-small group-data-[has-placeholder]/field:bg-surface group-data-[has-placeholder]/field:px-1 group-data-[has-placeholder]/field:leading-none',
        ],
      },
    },
  },
  defaultVariants: {
    variant: 'outlined',
  },
});

const s = selectTv();
export const Select = createSelect(
  {
    trigger: s.trigger(),
    value: s.value(),
    icon: s.icon(),
    popup: s.popup(),
    item: s.item(),
    itemIndicator: s.itemIndicator(),
    groupLabel: s.groupLabel(),
    scrollUpArrow: s.scrollUpArrow(),
    scrollDownArrow: s.scrollDownArrow(),
  },
  ({ variant }) => {
    const f = selectFieldTv({ variant });
    return {
      root: f.root(),
      field: f.field(),
      inputWrap: f.inputWrap(),
      value: f.value(),
      label: f.label(),
      icon: f.icon(),
      leadingIcon: f.leadingIcon(),
      supporting: f.supporting(),
      supportingText: f.supportingText(),
    };
  },
);

export type { SelectFieldProps } from '@m3-baseui/core';
