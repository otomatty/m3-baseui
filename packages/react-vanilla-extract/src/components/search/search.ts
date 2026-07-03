/**
 * search.ts — wires the VE styles into the shared parts factory.
 */
import { createSearch } from '@m3-baseui/core';
import {
  bar,
  icon,
  input,
  clear,
  popup,
  list,
  item,
  itemIndicator,
  empty,
  separator,
  groupLabel,
} from './search.css';

export const Search = createSearch({
  bar,
  icon,
  input,
  clear,
  popup,
  list,
  item,
  itemIndicator,
  empty,
  separator,
  groupLabel,
});
