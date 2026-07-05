/**
 * button-group.css.ts — vanilla-extract styles for the M3 Expressive ButtonGroup.
 *
 * Same DOM + `role="group"` as the Tailwind build: `standard` spaces the
 * buttons (12dp); `connected` tightens the gap (2dp) and reduces the children's
 * inner-facing (seam) corners to the `small` shape token while the outer corners
 * stay full. Expressive adds three `connected` state morphs: the seam shrinks to
 * `extra-small` (4dp) on press, a selected child rounds fully, and the pressed
 * child grows while its neighbours compress (`ExpandedRatio` 0.15 via `flex-grow`
 * + the fast spatial spring). The child rules target descendants, so — like the
 * Menu / FAB-menu builds — they live in `globalStyle` scoped to the connected class.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = style({
  // Compose `ButtonGroupDefaults.ExpandedRatio` (0.15), kept as a component-level
  // custom property (no system token exists for it).
  vars: { '--md-comp-button-group-expanded-ratio': '0.15' },
  display: 'inline-flex',
  alignItems: 'center',
});

export const standard = style({ gap: '12px' });

export const connected = style({ gap: '2px' });

// Connected children are equal-width flexible segments so the press squeeze can
// redistribute width; the fast spatial spring animates the growth.
globalStyle(`${connected} > *`, {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
  minWidth: 0,
  transitionProperty: 'flex-grow',
  transitionDuration: vars.sys.motion.duration.springSpatialFast,
  transitionTimingFunction: vars.sys.motion.easing.springSpatialFast,
});

// Connected: outer corners stay full; the inner-facing (seam) corners reduce.
globalStyle(`${connected} > *:not(:first-child):not(:last-child)`, {
  borderRadius: vars.sys.shape.small,
});
// first child: outer (start) corners stay full, inner (end) reduced. The
// `:not(:last-child)` guard leaves a lone child (both first and last) fully
// rounded — only morph the inner corner when there is a sibling to face.
globalStyle(`${connected} > *:first-child:not(:last-child)`, {
  borderStartEndRadius: vars.sys.shape.small,
  borderEndEndRadius: vars.sys.shape.small,
});
// last child: inner (start) reduced, outer (end) corners stay full.
globalStyle(`${connected} > *:last-child:not(:first-child)`, {
  borderStartStartRadius: vars.sys.shape.small,
  borderEndStartRadius: vars.sys.shape.small,
});

// Pressed: the seam morphs to extra-small (4dp).
globalStyle(`${connected} > *:not(:first-child):not(:last-child):is(:active, [data-pressed])`, {
  borderRadius: vars.sys.shape.extraSmall,
});
globalStyle(`${connected} > *:first-child:not(:last-child):is(:active, [data-pressed])`, {
  borderStartEndRadius: vars.sys.shape.extraSmall,
  borderEndEndRadius: vars.sys.shape.extraSmall,
});
globalStyle(`${connected} > *:last-child:not(:first-child):is(:active, [data-pressed])`, {
  borderStartStartRadius: vars.sys.shape.extraSmall,
  borderEndStartRadius: vars.sys.shape.extraSmall,
});

// Selected/toggled child rounds fully (highest specificity → wins the seam).
globalStyle(`${connected} > *[data-selected]:not(:first-child):not(:last-child)`, {
  borderRadius: vars.sys.shape.full,
});
globalStyle(`${connected} > *[data-selected]:first-child:not(:last-child)`, {
  borderStartEndRadius: vars.sys.shape.full,
  borderEndEndRadius: vars.sys.shape.full,
});
globalStyle(`${connected} > *[data-selected]:last-child:not(:first-child)`, {
  borderStartStartRadius: vars.sys.shape.full,
  borderEndStartRadius: vars.sys.shape.full,
});

// Press squeeze: the pressed child grows by the ExpandedRatio; equal-basis
// neighbours give up the space.
globalStyle(`${connected} > *:is(:active, [data-pressed])`, {
  flexGrow: 'calc(1 + var(--md-comp-button-group-expanded-ratio))',
});
