/**
 * select.ts — wires the VE styles into the shared parts factory.
 */
import { createSelect } from '@m3/core';
import {
  trigger,
  value,
  icon,
  popup,
  item,
  itemIndicator,
  groupLabel,
  scrollUpArrow,
  scrollDownArrow,
} from './select.css';

export const Select = createSelect({
  trigger,
  value,
  icon,
  popup,
  item,
  itemIndicator,
  groupLabel,
  scrollUpArrow,
  scrollDownArrow,
});
