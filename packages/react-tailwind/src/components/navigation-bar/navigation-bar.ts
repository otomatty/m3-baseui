/**
 * navigation-bar.ts — tailwind-variants slots for the M3 Expressive NavigationBar.
 *
 * 64dp bar on surface-container (M3 Expressive `NavigationBarTokens.ContainerHeight`).
 * The selected item surfaces `data-pressed` (Base UI Toggle); the pill, icon and
 * label colors key off it via the `group` on each item. Active label is
 * `secondary` + `labelMediumEmphasized` (Expressive), the state layer is the pill
 * `::before` tinted `on-secondary-container`, and its color springs
 * (`spring-effects-default`). The pointer ripple is added by the factory. Same DOM
 * as the VE build.
 */
import { createNavigationBar } from '@m3-baseui/core';
import { tv } from '../../tv';

// Color transitions use the M3 Expressive effects spring (critically damped, no
// bounce). Tailwind exposes the spring easings but not their durations, so the
// duration is read from the raw custom property.
const SPRING_COLOR =
  'transition-colors duration-[var(--md-sys-motion-duration-spring-effects-default)] ease-spring-effects-default';

export const navigationBarTv = tv({
  slots: {
    root: 'flex items-stretch justify-around w-full h-16 bg-surface-container',
    item: [
      'group relative flex flex-1 flex-col items-center justify-center gap-1 px-1 py-1',
      'bg-transparent border-0 cursor-pointer select-none outline-none',
      // M3 disabled is per-token (icon + label dimmed below), not a blanket fade.
      'data-[disabled]:pointer-events-none',
    ],
    // 56×32 active indicator (NavigationBarVerticalItemTokens).
    iconWrap: 'relative flex items-center justify-center w-14 h-8',
    indicator: [
      'absolute inset-0 rounded-full bg-transparent overflow-hidden',
      SPRING_COLOR,
      'group-data-[pressed]:bg-secondary-container',
      'before:absolute before:inset-0 before:bg-on-secondary-container before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'group-hover:before:opacity-[var(--md-sys-state-hover)]',
      'group-focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'group-active:before:opacity-[var(--md-sys-state-pressed)]',
      // No state layer on a disabled destination.
      'group-data-[disabled]:before:opacity-0',
    ],
    icon: [
      'relative flex items-center justify-center text-on-surface-variant',
      SPRING_COLOR,
      // Raw <svg> icons render at 24dp (Material Symbols set their own size).
      '[&_svg]:size-6',
      'group-data-[pressed]:text-on-secondary-container',
      // M3 disabled: icon dims to on-surface/0.38. The item is the only `.group`,
      // so the disabled+active override must test both attributes on that single
      // element (`.group[data-disabled][data-pressed] &`) to outrank the equal-
      // specificity data-[pressed] color — a stacked `group-data-*:group-data-*`
      // would expect two nested groups and never match.
      'group-data-[disabled]:text-on-surface/[0.38]',
      'group-[&[data-disabled][data-pressed]]:text-on-surface/[0.38]',
    ],
    label: [
      'text-label-medium text-on-surface-variant',
      SPRING_COLOR,
      // Expressive: active label is `secondary`, emphasized via the
      // labelMediumEmphasized typescale (weight 700), not a raw font-bold.
      'group-data-[pressed]:text-secondary group-data-[pressed]:text-label-medium-emphasized',
      // M3 disabled: label dims to on-surface/0.38. Same-element override (see the
      // icon slot) keeps a disabled+active label dimmed.
      'group-data-[disabled]:text-on-surface/[0.38]',
      'group-[&[data-disabled][data-pressed]]:text-on-surface/[0.38]',
    ],
  },
});

const s = navigationBarTv();
export const NavigationBar = createNavigationBar({
  root: s.root(),
  item: s.item(),
  iconWrap: s.iconWrap(),
  indicator: s.indicator(),
  icon: s.icon(),
  label: s.label(),
});
