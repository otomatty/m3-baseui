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
    borderRadius: vars.sys.shape.full,
    boxShadow: vars.sys.elevation.level3,
  },
  variants: {
    variant: {
      standard: {
        background: `rgb(${vars.sys.color.surfaceContainer})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
      },
      vibrant: {
        background: `rgb(${vars.sys.color.primaryContainer})`,
        color: `rgb(${vars.sys.color.onPrimaryContainer})`,
      },
    },
    orientation: {
      horizontal: { flexDirection: 'row', height: '64px', paddingInline: '8px' },
      vertical: { flexDirection: 'column', width: '64px', paddingBlock: '8px' },
    },
  },
  defaultVariants: { variant: 'standard', orientation: 'horizontal' },
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
