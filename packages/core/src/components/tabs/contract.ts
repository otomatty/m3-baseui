/**
 * tabs.contract.ts — variant set + slot classes for the M3 Tabs.
 *
 * Two M3 styles (`primary`, `secondary`). The variant lives on `Tabs.Root` and
 * affects several slots, so the resolver returns the full slot map per variant
 * and the factory propagates it to the parts via context.
 */
export const TABS_VARIANTS = ['primary', 'secondary'] as const;
export type TabsVariant = (typeof TABS_VARIANTS)[number];

export interface TabsSlotClasses {
  root: string;
  list: string;
  tab: string;
  indicator: string;
  panel: string;
}

export type TabsClassResolver = (variant: TabsVariant) => TabsSlotClasses;
