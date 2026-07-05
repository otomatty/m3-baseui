/**
 * toolbar.css.ts — vanilla-extract styles for the M3 Expressive Toolbar.
 * Same DOM + `data-variant` / `data-orientation` hooks as the Tailwind build.
 */
import { globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

export const toolbar = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    boxSizing: 'border-box',
    // Compose FloatingToolbar defaults to Level0 — no elevation.
    transformOrigin: 'center',
    transitionProperty: 'transform, opacity',
    transitionDuration: vars.sys.motion.duration.springSpatialFast,
    transitionTimingFunction: vars.sys.motion.easing.springSpatialFast,
    selectors: {
      // show/hide (expand/collapse) hook: consumers toggle data-expanded.
      '&[data-expanded="false"]': { transform: 'scale(0.9)', opacity: 0 },
    },
  },
  variants: {
    type: {
      floating: { borderRadius: vars.sys.shape.full },
      docked: { borderRadius: 0, width: '100%' },
    },
    variant: {
      standard: {
        background: `rgb(${vars.sys.color.surfaceContainer})`,
        color: `rgb(${vars.sys.color.onSurface})`,
      },
      vibrant: {
        background: `rgb(${vars.sys.color.primaryContainer})`,
        color: `rgb(${vars.sys.color.onPrimaryContainer})`,
      },
    },
    orientation: {
      horizontal: { flexDirection: 'row', height: '64px' },
      vertical: { flexDirection: 'column', width: '64px' },
    },
  },
  compoundVariants: [
    // Padding: floating 8dp, docked 16dp (ContainerLeading/TrailingSpace).
    { variants: { type: 'floating', orientation: 'horizontal' }, style: { paddingInline: '8px' } },
    { variants: { type: 'floating', orientation: 'vertical' }, style: { paddingBlock: '8px' } },
    { variants: { type: 'docked', orientation: 'horizontal' }, style: { paddingInline: '16px' } },
    { variants: { type: 'docked', orientation: 'vertical' }, style: { paddingBlock: '16px' } },
    // Docked is always surface-container (there is no vibrant docked token).
    {
      variants: { type: 'docked', variant: 'vibrant' },
      style: {
        background: `rgb(${vars.sys.color.surfaceContainer})`,
        color: `rgb(${vars.sys.color.onSurface})`,
      },
    },
  ],
  defaultVariants: { type: 'floating', variant: 'standard', orientation: 'horizontal' },
});

// Action icons render at 24dp. `data-variant` is unique to the toolbar root
// (the bottom app bar's role="toolbar" has no data-variant), so scope to it.
globalStyle('[role="toolbar"][data-variant] svg', { width: '24px', height: '24px' });

// Vibrant: force interactive children to the container's on-primary-container
// foreground (IconButton paints its own on-surface-variant). Exclude disabled
// so they keep their dimmed color — matching the Tailwind build's cascade.
globalStyle(
  '[role="toolbar"][data-variant="vibrant"] button:not(:disabled):not([data-disabled]), [role="toolbar"][data-variant="vibrant"] a:not([data-disabled])',
  { color: `rgb(${vars.sys.color.onPrimaryContainer})` },
);
