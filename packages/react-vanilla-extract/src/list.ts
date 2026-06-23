/**
 * list.ts — wires the VE styles into the shared List factory.
 */
import { createList } from '@otomatty/core';
import { cx } from '@otomatty/core';
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
export type { ListItemProps, ListItemLines } from '@otomatty/core';
