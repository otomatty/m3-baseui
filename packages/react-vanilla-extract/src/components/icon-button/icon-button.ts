/**
 * icon-button.ts — wires the VE recipe into the shared factory.
 */
import { createIconButton, toToggle } from '@m3-baseui/core';
import { iconButton } from './icon-button.css';

export const IconButton = createIconButton(({ variant, selected, size, width, shape }) =>
  iconButton({ variant, size, width, shape, toggle: toToggle(selected) }),
);
export type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
  IconButtonWidth,
  IconButtonShape,
} from '@m3-baseui/core';
