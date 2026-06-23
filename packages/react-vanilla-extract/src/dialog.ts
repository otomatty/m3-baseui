/**
 * dialog.ts — wires the VE styles into the shared parts factory.
 */
import { createDialog } from '@otomatty/core';
import { backdrop, popup, title, description, close } from './dialog.css';

export const Dialog = createDialog({ backdrop, popup, title, description, close });
