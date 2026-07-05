/**
 * navigation-rail.ts — tailwind-variants slots for the M3 Expressive NavigationRail.
 *
 * 96dp collapsed vertical rail on `surface` (M3 Expressive
 * `NavigationRailCollapsedTokens.ContainerWidth`; 44dp top space, 4dp item gap,
 * 64dp item height). The selected destination surfaces `data-pressed` (Base UI
 * Toggle); the pill, icon and label colors key off it via the `group` on each
 * item. Active label is `secondary` + `labelMediumEmphasized`; the state layer is
 * the pill `::before` tinted `on-secondary-container` and its color springs. The
 * pointer ripple is added by the factory. `Root` renders an optional leading
 * `header` (menu button / FAB) with a 40dp minimum trailing space
 * (`HeaderSpaceMinimum`). Same DOM + `data-*` as the VE build (mirrors NavigationBar).
 */
import { createNavigationRail } from '@m3-baseui/core';
import { tv } from '../../tv';

// Color transitions use the M3 Expressive effects spring (critically damped, no
// bounce). Tailwind exposes the spring easings but not their durations.
const SPRING_COLOR =
  'transition-colors duration-[var(--md-sys-motion-duration-spring-effects-default)] ease-spring-effects-default';

export const navigationRailTv = tv({
  slots: {
    // `group/rail` lets items switch to the expanded (horizontal) layout off the
    // root's `data-expanded`. Collapsed 96dp; expanded 220–360dp (the width
    // animates with the default spatial spring). `modal` is an elevated
    // surface-container sheet with a 16dp corner.
    root: [
      'group/rail flex flex-col items-center gap-1 h-full w-24 py-11 bg-surface',
      'transition-[width] duration-[var(--md-sys-motion-duration-spring-spatial-default)] ease-spring-spatial-default',
      'data-[expanded]:w-[220px] data-[expanded]:max-w-[360px] data-[expanded]:items-stretch data-[expanded]:px-3',
      'data-[modal]:bg-surface-container data-[modal]:shadow-level2 data-[modal]:rounded-large',
    ],
    // 40dp minimum space below the header (HeaderSpaceMinimum).
    header: 'flex flex-col items-center gap-3 mb-10',
    item: [
      'group relative flex h-16 flex-col items-center justify-center gap-1 px-1 py-1',
      'bg-transparent border-0 cursor-pointer select-none outline-none',
      // Expanded: a horizontal item (icon left, label right) with a 56dp-tall
      // indicator (NavigationRailHorizontalItemTokens: 16dp leading, 8dp icon–label).
      'group-data-[expanded]/rail:h-14 group-data-[expanded]/rail:w-full group-data-[expanded]/rail:flex-row group-data-[expanded]/rail:justify-start group-data-[expanded]/rail:gap-2 group-data-[expanded]/rail:pl-4 group-data-[expanded]/rail:pr-6',
      // M3 disabled is per-token (icon + label dimmed below), not a blanket fade.
      'data-[disabled]:pointer-events-none',
    ],
    // Collapsed: a 56×32 indicator box. Expanded: unconstrained so the indicator
    // (absolute) spans the whole horizontal item instead.
    iconWrap:
      'relative flex items-center justify-center w-14 h-8 group-data-[expanded]/rail:static group-data-[expanded]/rail:w-auto group-data-[expanded]/rail:h-auto',
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
      // so the disabled+active override tests both attributes on that single
      // element (see NavigationBar for the rationale).
      'group-data-[disabled]:text-on-surface/[0.38]',
      'group-[&[data-disabled][data-pressed]]:text-on-surface/[0.38]',
    ],
    label: [
      'text-label-medium text-on-surface-variant',
      SPRING_COLOR,
      // Expanded horizontal items use labelLarge (NavigationRailHorizontalItemTokens).
      'group-data-[expanded]/rail:text-label-large',
      // Expressive: active label is `secondary`, emphasized via labelMediumEmphasized.
      'group-data-[pressed]:text-secondary group-data-[pressed]:text-label-medium-emphasized',
      // M3 disabled: label dims to on-surface/0.38 (same-element override).
      'group-data-[disabled]:text-on-surface/[0.38]',
      'group-[&[data-disabled][data-pressed]]:text-on-surface/[0.38]',
    ],
  },
});

const s = navigationRailTv();
export const NavigationRail = createNavigationRail({
  root: s.root(),
  header: s.header(),
  item: s.item(),
  iconWrap: s.iconWrap(),
  indicator: s.indicator(),
  icon: s.icon(),
  label: s.label(),
});
