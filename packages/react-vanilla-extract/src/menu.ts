/**
 * menu.ts — wires the VE styles into the shared parts factory.
 */
import { createMenu } from '@m3/core';
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
