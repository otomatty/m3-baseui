/**
 * menu-surface.ts — shared M3 menu popup surface tokens (Menus specs).
 *
 * Used by Menu (standard width) and Select (anchor-width + scroll). Engine-neutral
 * class strings; both components compose variants on top.
 */
import { tv } from '../../tv';

/** Base popup surface shared by Menu and Select list popups. */
export const menuSurfaceBase = [
  'py-2',
  'bg-surface-container text-on-surface rounded-extra-small shadow-level2',
  'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
  'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
  'data-[ending-style]:opacity-0',
  'focus:outline-none',
] as const;

export const menuSurfaceTv = tv({
  slots: {
    popup: ['max-w-[280px]', ...menuSurfaceBase],
    groupLabel: 'px-3 py-2 text-label-small text-on-surface-variant',
  },
  variants: {
    width: {
      /** Standalone Menu: 112–280dp. */
      standard: { popup: 'min-w-[112px]' },
      /** Exposed Dropdown / Select: at least anchor width, capped at 280dp. */
      anchor: { popup: 'min-w-[max(112px,var(--anchor-width))]' },
    },
    scroll: {
      none: {},
      /** Select popup: clamp height and scroll the list. */
      auto: { popup: 'max-h-[var(--available-height)] overflow-auto' },
    },
  },
  defaultVariants: {
    width: 'standard',
    scroll: 'none',
  },
});

export const menuSurface = menuSurfaceTv();
