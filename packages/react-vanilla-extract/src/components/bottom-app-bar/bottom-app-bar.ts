/**
 * bottom-app-bar.ts — wires the VE styles into the shared BottomAppBar factory.
 */
import { createBottomAppBar } from '@m3-baseui/core';
import { root, actions, fab } from './bottom-app-bar.css';

export const BottomAppBar = createBottomAppBar({ root, actions, fab });
export type { BottomAppBarProps } from '@m3-baseui/core';
