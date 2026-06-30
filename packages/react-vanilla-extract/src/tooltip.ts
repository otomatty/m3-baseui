/**
 * tooltip.ts — wires the VE styles into the shared parts factories.
 */
import { createTooltip, createRichTooltip } from '@m3-baseui/core';
import {
  popup,
  arrow,
  richPopup,
  richArrow,
  subhead,
  supportingText,
  actions,
} from './tooltip.css';

export const Tooltip = createTooltip({ popup, arrow });

export const RichTooltip = createRichTooltip({
  popup: richPopup,
  arrow: richArrow,
  subhead,
  supportingText,
  actions,
});
