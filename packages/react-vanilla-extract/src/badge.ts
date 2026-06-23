/**
 * badge.ts — wires the VE recipe into the shared Badge factory.
 */
import { createBadge } from '@otomatty/core';
import { badge } from './badge.css';

export const Badge = createBadge({
  root: ({ size }) => badge({ size }),
});
export type { BadgeProps, BadgeSize } from '@otomatty/core';
