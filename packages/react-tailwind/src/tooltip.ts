/**
 * tooltip.ts — Tailwind classes for the M3 plain Tooltip.
 *
 * Inverse-surface background, body-small text, extra-small corners, with a fade
 * + small-move transition driven by Base UI's data-[starting-style] /
 * data-[ending-style] attributes.
 */
import { createTooltip } from '@m3/core';
import { tv } from './tv';

export const tooltipTv = tv({
  slots: {
    popup: [
      'bg-inverse-surface text-inverse-on-surface text-body-small',
      'rounded-extra-small px-2 py-1 max-w-[224px] select-none',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
    ],
    arrow: ['text-inverse-surface'],
  },
});

const t = tooltipTv();
export const Tooltip = createTooltip({ popup: t.popup(), arrow: t.arrow() });
