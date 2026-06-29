/**
 * toolbar.ts — wires the VE styles into the shared Toolbar factory.
 */
import { createToolbar } from '@m3-baseui/core';
import { toolbar } from './toolbar.css';

export const Toolbar = createToolbar(({ variant, orientation }) =>
  toolbar({ variant, orientation }),
);
export type { ToolbarProps, ToolbarVariant, ToolbarOrientation } from '@m3-baseui/core';
