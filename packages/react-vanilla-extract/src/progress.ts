/**
 * progress.ts — wires the VE styles into the shared Progress factory.
 */
import { createProgress } from '@m3/core';
import {
  linearRoot,
  linearTrack,
  linearIndicator,
  circularRoot,
  circularTrack,
  circularIndicator,
} from './progress.css';

export const Progress = createProgress({
  linear: { root: linearRoot, track: linearTrack, indicator: linearIndicator },
  circular: { root: circularRoot, track: circularTrack, indicator: circularIndicator },
});
export type { LinearProgressProps, CircularProgressProps } from '@m3/core';
