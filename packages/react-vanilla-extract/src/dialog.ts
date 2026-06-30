/**
 * dialog.ts — wires the VE styles into the shared parts factory.
 */
import { createDialog } from '@m3-baseui/core';
import {
  backdrop,
  popupBasic,
  popupFullscreen,
  header,
  icon,
  title,
  description,
  divider,
  actions,
  close,
} from './dialog.css';

export const Dialog = createDialog({
  backdrop,
  popup: ({ fullscreen }) => (fullscreen ? popupFullscreen : popupBasic),
  header,
  icon,
  title,
  description,
  divider,
  actions,
  close,
});
