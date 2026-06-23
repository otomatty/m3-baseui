/**
 * segmented-button.ts — wires the VE styles into the shared SegmentedButton factory.
 */
import { createSegmentedButton } from '@otomatty/core';
import { root, item, check, icon, label } from './segmented-button.css';

export const SegmentedButton = createSegmentedButton({
  root,
  item,
  check,
  icon,
  label,
});
