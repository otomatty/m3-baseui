/**
 * snackbar.ts — wires the VE styles into the shared Snackbar factory.
 */
import { createSnackbar } from '@otomatty/core';
import * as s from './snackbar.css';

export { useSnackbar } from '@otomatty/core';

export const Snackbar = createSnackbar({
  viewport: s.viewport,
  root: s.root,
  content: s.content,
  title: s.title,
  description: s.description,
  action: s.action,
  close: s.close,
});
