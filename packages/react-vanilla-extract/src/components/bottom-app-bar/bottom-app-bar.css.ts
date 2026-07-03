/**
 * bottom-app-bar.css.ts — vanilla-extract styles for the M3 BottomAppBar.
 * Same DOM as the Tailwind build: an 80dp `surface-container` `role="toolbar"`
 * holding leading action icons and an optional trailing FAB.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  boxSizing: 'border-box',
  height: '80px',
  paddingInline: '4px',
  background: `rgb(${vars.sys.color.surfaceContainer})`,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  paddingLeft: '8px',
});
globalStyle(`${actions} svg`, { width: '24px', height: '24px' });

export const fab = style({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '12px',
});
