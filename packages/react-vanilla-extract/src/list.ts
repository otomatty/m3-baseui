/**
 * list.ts — wires the VE styles into the shared List factory.
 */
import { createList } from '@m3-baseui/core';
import { cx } from '@m3-baseui/core';
import { root, itemBase, item, leading, content, headline, supporting, trailing } from './list.css';

export const List = createList({
  root,
  item: ({ lines, interactive }) => ({
    item: cx(itemBase, item({ lines, interactive })),
    leading,
    content,
    headline,
    supporting,
    trailing,
  }),
});
export type { ListItemProps, ListItemLines } from '@m3-baseui/core';
