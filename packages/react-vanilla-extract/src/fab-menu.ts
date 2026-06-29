/**
 * fab-menu.ts — wires the VE styles into the shared FAB menu factory.
 */
import { createFabMenu } from '@m3-baseui/core';
import { fab } from './fab.css';
import { popup, item } from './fab-menu.css';

export const FabMenu = createFabMenu(({ size, color }) => fab({ size, color }), {
  popup,
  item: (color) => item({ color }),
});

export type { FabMenuTriggerProps, FabMenuItemProps } from '@m3-baseui/core';
