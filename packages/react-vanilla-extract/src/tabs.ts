/**
 * tabs.ts — wires the VE styles into the shared parts factory.
 */
import { createTabs } from '@m3-baseui/core';
import { root, list, tab, indicator, panel } from './tabs.css';

export const Tabs = createTabs((variant) => ({
  root,
  list,
  tab: tab({ variant }),
  indicator: indicator({ variant }),
  panel,
}));
export type { TabsVariant } from '@m3-baseui/core';
