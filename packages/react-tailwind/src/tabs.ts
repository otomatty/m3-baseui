/**
 * tabs.ts — tailwind-variants slots for the M3 Tabs.
 *
 * The active-tab underline reads Base UI's --active-tab-width/left CSS vars on
 * the indicator. The `variant` recolors the active tab (primary → primary,
 * secondary → on-surface). Tabs carry a `before:` state layer + ripple.
 */
import { createTabs } from '@m3/core';
import { tv } from 'tailwind-variants';

export const tabsTv = tv({
  slots: {
    root: 'flex flex-col',
    list: 'relative flex border-b border-outline-variant',
    tab: [
      'relative flex items-center justify-center gap-2 h-12 px-4 overflow-hidden',
      'cursor-pointer select-none border-0 bg-transparent outline-none text-title-small',
      'text-on-surface-variant',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
    ],
    indicator: [
      'absolute bottom-0 left-0 h-[3px] rounded-t-[3px] bg-primary',
      'w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)]',
      'transition-all duration-200 ease-standard',
    ],
    panel: 'p-4 outline-none',
  },
  variants: {
    variant: {
      primary: { tab: 'data-[selected]:text-primary' },
      secondary: { tab: 'data-[selected]:text-on-surface' },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const Tabs = createTabs((variant) => {
  const s = tabsTv({ variant });
  return {
    root: s.root(),
    list: s.list(),
    tab: s.tab(),
    indicator: s.indicator(),
    panel: s.panel(),
  };
});
export type { TabsVariant } from '@m3/core';
