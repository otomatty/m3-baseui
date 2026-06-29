/**
 * top-app-bar.ts — wires the VE styles into the shared TopAppBar factory.
 */
import { createTopAppBar } from '@m3-baseui/core';
import { root, row, leading, headline, trailing } from './top-app-bar.css';

export const TopAppBar = createTopAppBar(({ variant }) => ({
  root: root({ variant }),
  row,
  leading,
  headline: headline({ variant }),
  trailing,
}));
export type { TopAppBarProps, TopAppBarVariant } from '@m3-baseui/core';
