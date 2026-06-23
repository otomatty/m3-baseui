/**
 * menu.ts — wires the VE styles into the shared parts factory.
 */
import { createMenu } from '@otomatty/core';
import {
  popup,
  item,
  separator,
  groupLabel,
  submenuTrigger,
  checkboxItem,
  radioItem,
  itemIndicator,
} from './menu.css';

export const Menu = createMenu({
  popup,
  item,
  separator,
  groupLabel,
  submenuTrigger,
  checkboxItem,
  radioItem,
  itemIndicator,
});
