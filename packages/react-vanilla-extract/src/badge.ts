/**
 * badge.ts — wires the VE recipe into the shared Badge factory.
 */
import { createBadge } from '@m3-baseui/core';
import { badge } from './badge.css';

export const Badge = createBadge({
  root: ({ size }) => badge({ size }),
});
export type { BadgeProps, BadgeSize } from '@m3-baseui/core';
