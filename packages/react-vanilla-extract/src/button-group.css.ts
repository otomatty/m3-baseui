/**
 * button-group.css.ts — vanilla-extract styles for the M3 ButtonGroup.
 *
 * Same DOM + `role="group"` as the Tailwind build: `standard` spaces the
 * buttons (8dp); `connected` tightens the gap (2dp) and reduces the children's
 * inner-facing (seam) corners to the `small` shape token while the outer corners
 * stay full. The child-corner rules target descendants, so — like the Menu /
 * FAB-menu builds — they live in `globalStyle` scoped to the connected class.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const standard = style({ gap: '8px' });

export const connected = style({ gap: '2px' });

// Connected: outer corners stay full; the inner-facing (seam) corners reduce.
globalStyle(`${connected} > *:not(:first-child):not(:last-child)`, {
  borderRadius: vars.sys.shape.small,
});
// first child: outer (start) corners stay full, inner (end) reduced.
globalStyle(`${connected} > *:first-child`, {
  borderStartEndRadius: vars.sys.shape.small,
  borderEndEndRadius: vars.sys.shape.small,
});
// last child: inner (start) reduced, outer (end) corners stay full.
globalStyle(`${connected} > *:last-child`, {
  borderStartStartRadius: vars.sys.shape.small,
  borderEndStartRadius: vars.sys.shape.small,
});
