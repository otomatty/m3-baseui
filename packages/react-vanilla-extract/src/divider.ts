/**
 * divider.ts — wires the VE recipe into the shared Divider factory.
 */
import { createDivider } from '@m3-baseui/core';
import { divider } from './divider.css';

export const Divider = createDivider(({ inset, orientation }) => divider({ inset, orientation }));
export type { DividerProps, DividerInset, DividerOrientation } from '@m3-baseui/core';
