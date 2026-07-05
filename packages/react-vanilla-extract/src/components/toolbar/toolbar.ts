/**
 * toolbar.ts — wires the VE styles into the shared Toolbar factory.
 */
import { createToolbar } from '@m3-baseui/core';
import { toolbar } from './toolbar.css';

export const Toolbar = createToolbar(({ type, variant, orientation }) =>
  toolbar({ type, variant, orientation }),
);
export type {
  ToolbarProps,
  ToolbarType,
  ToolbarVariant,
  ToolbarOrientation,
} from '@m3-baseui/core';
