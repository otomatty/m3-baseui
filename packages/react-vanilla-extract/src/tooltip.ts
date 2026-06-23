/**
 * tooltip.ts — wires the VE styles into the shared parts factory.
 */
import { createTooltip } from '@otomatty/core';
import { popup, arrow } from './tooltip.css';

export const Tooltip = createTooltip({ popup, arrow });
