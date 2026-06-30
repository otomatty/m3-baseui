/**
 * tooltip.ts — Tailwind classes for the M3 Tooltip (plain + rich).
 *
 * Plain (`Tooltip`, Base UI Tooltip): inverse-surface background, body-small
 * text, extra-small corners, with a fade + small-move transition driven by Base
 * UI's data-[starting-style] / data-[ending-style] attributes.
 *
 * Rich (`RichTooltip`, Base UI Popover): surface-container surface (level2
 * elevation, 12dp corner, 320dp max) holding an optional title-small subhead,
 * body-medium supporting text, and a trailing action row. Built on Popover so
 * its buttons are reachable by keyboard and touch.
 */
import { createTooltip, createRichTooltip } from '@m3-baseui/core';
import { tv } from './tv';

const transition = [
  'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
  'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
  'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
];

export const tooltipTv = tv({
  slots: {
    popup: [
      'bg-inverse-surface text-inverse-on-surface text-body-small',
      'rounded-extra-small px-2 py-1 max-w-[224px] select-none',
      ...transition,
    ],
    arrow: ['text-inverse-surface'],
  },
});

export const richTooltipTv = tv({
  slots: {
    popup: [
      'bg-surface-container text-on-surface shadow-level2',
      'rounded-medium px-4 py-3 max-w-[320px] flex flex-col gap-1',
      'outline-none',
      ...transition,
    ],
    arrow: ['text-surface-container'],
    subhead: ['text-title-small text-on-surface m-0'],
    supportingText: ['text-body-medium text-on-surface-variant m-0'],
    actions: ['flex flex-wrap items-center gap-2 mt-1 -ml-2'],
  },
});

const t = tooltipTv();
export const Tooltip = createTooltip({ popup: t.popup(), arrow: t.arrow() });

const r = richTooltipTv();
export const RichTooltip = createRichTooltip({
  popup: r.popup(),
  arrow: r.arrow(),
  subhead: r.subhead(),
  supportingText: r.supportingText(),
  actions: r.actions(),
});
