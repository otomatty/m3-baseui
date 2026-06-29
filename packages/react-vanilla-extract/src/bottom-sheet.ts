/**
 * bottom-sheet.ts — wires the VE styles into the shared parts factory.
 */
import { createBottomSheet } from '@m3-baseui/core';
import { backdrop, viewport, popup, handle, title, description } from './bottom-sheet.css';

export const BottomSheet = createBottomSheet({
  backdrop,
  viewport,
  popup,
  handle,
  title,
  description,
});
export type { BottomSheetVariant } from '@m3-baseui/core';
