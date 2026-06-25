/**
 * item.ts — tailwind-variants slots for the M3 Item row primitive.
 *
 * The shared row layout: leading slot, overline/headline/supporting column and
 * trailing slot. Headline is `body-large`/`on-surface`, overline `label-small`,
 * supporting `body-medium`, leading/trailing `on-surface-variant`. Inert by
 * design — interactive surfaces wrap it. Same DOM as the VE build.
 */
import { createItem } from '@m3-baseui/core';
import { tv } from './tv';

export const itemTv = tv({
  slots: {
    root: [
      'relative flex w-full items-center gap-4 box-border px-4 py-3 min-h-14 text-left',
      'bg-transparent text-on-surface',
    ],
    leading: 'flex items-center justify-center shrink-0 text-on-surface-variant [&_svg]:size-6',
    content: 'flex flex-col min-w-0 flex-1',
    overline: 'text-label-small text-on-surface-variant',
    headline: 'text-body-large text-on-surface',
    supporting: 'text-body-medium text-on-surface-variant',
    trailing: 'flex items-center shrink-0 text-label-small text-on-surface-variant [&_svg]:size-6',
  },
});

const s = itemTv();
export const Item = createItem({
  root: s.root(),
  leading: s.leading(),
  content: s.content(),
  overline: s.overline(),
  headline: s.headline(),
  supporting: s.supporting(),
  trailing: s.trailing(),
});
export type { ItemProps } from '@m3-baseui/core';
