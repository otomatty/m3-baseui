/**
 * navigation-drawer.ts — wires the VE styles into the shared NavigationDrawer factory.
 */
import { createNavigationDrawer } from '@m3-baseui/core';
import { root, headline, item, leading, label, trailing } from './navigation-drawer.css';

export const NavigationDrawer = createNavigationDrawer({
  root: ({ variant }) => root({ variant }),
  headline,
  item,
  leading,
  label,
  trailing,
});
export type { NavigationDrawerVariant } from '@m3-baseui/core';
