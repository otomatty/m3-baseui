/**
 * tooltip.ts — wires the VE styles into the shared parts factory.
 */
import { createTooltip } from '@m3-baseui/core';
import { popup, arrow, richPopup, subhead, supportingText, actions } from './tooltip.css';

export const Tooltip = createTooltip({
  popup,
  arrow,
  richPopup,
  subhead,
  supportingText,
  actions,
});
