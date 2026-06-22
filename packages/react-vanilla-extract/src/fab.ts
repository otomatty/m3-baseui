/**
 * fab.ts — wires the VE recipe into the shared FAB factory.
 */
import { createFab } from '@m3/core';
import { fab } from './fab.css';

export const Fab = createFab(({ size, color }) => fab({ size, color }));
export type { FabProps, FabSize, FabColor } from '@m3/core';
