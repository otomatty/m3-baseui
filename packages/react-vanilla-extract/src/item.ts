/**
 * item.ts — wires the VE styles into the shared Item factory.
 */
import { createItem } from '@m3/core';
import { root, leading, content, overline, headline, supporting, trailing } from './item.css';

export const Item = createItem({
  root,
  leading,
  content,
  overline,
  headline,
  supporting,
  trailing,
});
export type { ItemProps } from '@m3/core';
