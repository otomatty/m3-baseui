/**
 * motion.ts — shared M3 Expressive spring transition class strings.
 *
 * Tailwind exposes the spring easings (`ease-spring-*`) but not their durations,
 * so the duration is read from the raw `--md-sys-motion-duration-spring-*` custom
 * property. Centralised here so the spring timing only needs to change in one place.
 */

/** Color/state transitions: the effects spring (critically damped, no bounce). */
export const SPRING_COLOR =
  'transition-colors duration-[var(--md-sys-motion-duration-spring-effects-default)] ease-spring-effects-default';
