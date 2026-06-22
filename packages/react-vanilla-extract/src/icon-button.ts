/**
 * icon-button.ts — wires the VE recipe into the shared factory.
 */
import { createIconButton } from '@m3/core';
import { iconButton } from './icon-button.css';

export const IconButton = createIconButton(({ variant, selected, size, width }) =>
  iconButton({ variant, selected, size, width }),
);
export type { IconButtonProps, IconButtonVariant } from '@m3/core';
