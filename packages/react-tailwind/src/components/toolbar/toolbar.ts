/**
 * toolbar.ts — tailwind-variants for the M3 Expressive Toolbar.
 *
 * `floating` is a full-radius pill (no elevation — Compose `FloatingToolbar`
 * defaults to Level0); `docked` is a square-cornered, full-width
 * `surface-container` bar (`DockedToolbarTokens`: 64dp, 16dp leading/trailing,
 * 4–32dp spacing). `standard` rides on surface-container with `on-surface`
 * content; `vibrant` on primary-container — forcing its interactive children
 * (icon buttons / links) to `on-primary-container` (IconButton otherwise paints
 * its own on-surface-variant). The descendant selector outranks the button's own
 * color but not its higher-specificity `data-[disabled]` rule, so disabled actions
 * still dim. A `data-expanded="false"` hook collapses the bar with the fast
 * spatial spring (show/hide). Same DOM + `data-*` as VE.
 *
 * Note: the M3 vibrant toggle-*selected* inversion (a selected action flipping to
 * surface-container / on-surface) is deferred — it requires overriding
 * IconButton's own selected colors, which neither engine can do drop-in via CSS
 * specificity alone (it would need `!important`, unavailable in vanilla-extract).
 */
import { createToolbar } from '@m3-baseui/core';
import { tv } from '../../tv';

export const toolbarTv = tv({
  base: [
    'inline-flex items-center justify-center gap-1 box-border [&_svg]:size-6',
    // show/hide (expand/collapse) hook: consumers toggle data-expanded.
    'origin-center transition-[transform,opacity] duration-[var(--md-sys-motion-duration-spring-spatial-fast)] ease-spring-spatial-fast',
    'data-[expanded=false]:scale-90 data-[expanded=false]:opacity-0',
  ],
  variants: {
    type: {
      floating: 'rounded-full',
      docked: 'rounded-none w-full',
    },
    variant: {
      standard: 'bg-surface-container text-on-surface',
      // Container colors only; the vibrant child-color forcing lives in the
      // floating+vibrant compound so a docked (surface) toolbar doesn't inherit it.
      vibrant: 'bg-primary-container text-on-primary-container',
    },
    orientation: {
      horizontal: 'flex-row h-16',
      vertical: 'flex-col w-16',
    },
  },
  compoundVariants: [
    // Padding: floating 8dp, docked 16dp (ContainerLeading/TrailingSpace).
    { type: 'floating', orientation: 'horizontal', class: 'px-2' },
    { type: 'floating', orientation: 'vertical', class: 'py-2' },
    { type: 'docked', orientation: 'horizontal', class: 'px-4' },
    { type: 'docked', orientation: 'vertical', class: 'py-4' },
    // Only a *floating* vibrant toolbar forces its children to on-primary-container
    // (IconButton otherwise paints on-surface-variant).
    {
      type: 'floating',
      variant: 'vibrant',
      class: '[&_button]:text-on-primary-container [&_a]:text-on-primary-container',
    },
    // Docked is always surface-container (there is no vibrant docked token), so its
    // children keep their own colors — no vibrant forcing.
    { type: 'docked', variant: 'vibrant', class: 'bg-surface-container text-on-surface' },
  ],
  defaultVariants: { type: 'floating', variant: 'standard', orientation: 'horizontal' },
});

export const Toolbar = createToolbar(({ type, variant, orientation }) =>
  toolbarTv({ type, variant, orientation }),
);
export type {
  ToolbarProps,
  ToolbarType,
  ToolbarVariant,
  ToolbarOrientation,
} from '@m3-baseui/core';
