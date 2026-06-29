/**
 * loading-indicator.ts — wires the VE styles into the shared LoadingIndicator factory.
 */
import { createLoadingIndicator } from '@m3-baseui/core';
import { cx } from '@m3-baseui/core';
import { root, contained as containedClass, indicator } from './loading-indicator.css';

export const LoadingIndicator = createLoadingIndicator(({ contained }) => ({
  root: contained ? cx(root, containedClass) : root,
  indicator,
}));
export type { LoadingIndicatorProps } from '@m3-baseui/core';
