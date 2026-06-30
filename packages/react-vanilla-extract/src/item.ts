/**
 * item.ts — wires the VE styles into the shared Item factory.
 */
import { createItem } from '@m3-baseui/core';
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
export { ITEM_LEADING_VARIANTS } from '@m3-baseui/core';
export type { ItemProps, ItemLeadingVariant } from '@m3-baseui/core';
