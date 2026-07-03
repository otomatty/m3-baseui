/**
 * side-sheet.ts — wires the VE styles into the shared parts factory.
 */
import { createSideSheet } from '@m3-baseui/core';
import { backdrop, viewport, popup, header, title, description, close } from './side-sheet.css';

export const SideSheet = createSideSheet({
  backdrop,
  viewport,
  popup: ({ variant }) => popup({ variant }),
  header,
  title,
  description,
  close,
});
export type { SideSheetVariant, SideSheetSide } from '@m3-baseui/core';
