/**
 * dialog.ts — wires the VE styles into the shared parts factory.
 */
import { createDialog } from '@m3-baseui/core';
import { backdrop, popup, title, description, close } from './dialog.css';

export const Dialog = createDialog({ backdrop, popup, title, description, close });
