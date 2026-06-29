/**
 * toolbar.ts — tailwind-variants for the M3 Expressive Toolbar.
 *
 * A floating, full-radius pill (elevation level3) that groups action icons.
 * `standard` rides on surface-container; `vibrant` on primary-container.
 * `vertical` swaps the main axis and the fixed dimension. Same DOM as the VE build.
 */
import { createToolbar } from '@m3-baseui/core';
import { tv } from './tv';

export const toolbarTv = tv({
  base: 'inline-flex items-center justify-center gap-1 box-border rounded-full shadow-level3 [&_svg]:size-6',
  variants: {
    variant: {
      standard: 'bg-surface-container text-on-surface-variant',
      vibrant: 'bg-primary-container text-on-primary-container',
    },
    orientation: {
      horizontal: 'flex-row h-16 px-2',
      vertical: 'flex-col w-16 py-2',
    },
  },
  defaultVariants: { variant: 'standard', orientation: 'horizontal' },
});

export const Toolbar = createToolbar(({ variant, orientation }) =>
  toolbarTv({ variant, orientation }),
);
export type { ToolbarProps, ToolbarVariant, ToolbarOrientation } from '@m3-baseui/core';
