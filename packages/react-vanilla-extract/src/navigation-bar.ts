/**
 * navigation-bar.ts — wires the VE styles into the shared NavigationBar factory.
 */
import { createNavigationBar } from '@m3/core';
import { root, item, iconWrap, indicator, icon, label } from './navigation-bar.css';

export const NavigationBar = createNavigationBar({
  root,
  item,
  iconWrap,
  indicator,
  icon,
  label,
});
