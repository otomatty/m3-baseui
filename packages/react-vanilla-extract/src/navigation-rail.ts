/**
 * navigation-rail.ts — wires the VE styles into the shared NavigationRail factory.
 */
import { createNavigationRail } from '@m3-baseui/core';
import { root, header, item, iconWrap, indicator, icon, label } from './navigation-rail.css';

export const NavigationRail = createNavigationRail({
  root,
  header,
  item,
  iconWrap,
  indicator,
  icon,
  label,
});
