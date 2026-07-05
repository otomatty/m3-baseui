/**
 * fab.ts — wires the VE recipe into the shared FAB factory.
 */
import { createFab } from '@m3-baseui/core';
import { fab } from './fab.css';

export const Fab = createFab(({ size, color, variant }) => fab({ size, color, variant }));
export type { FabProps, FabSize, FabVariant, FabColor } from '@m3-baseui/core';
