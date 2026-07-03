/**
 * split-button.ts — wires the VE styles into the shared SplitButton factory.
 */
import { createSplitButton } from '@m3-baseui/core';
import { group, leading, trailing, chevron, popup, item } from './split-button.css';

export const SplitButton = createSplitButton({
  group,
  leading: (variant) => leading({ variant }),
  trailing: (variant) => trailing({ variant }),
  chevron,
  popup,
  item,
});
