/**
 * slider.contract.ts — slot classes for the M3 Slider.
 */
import type * as React from 'react';

export interface SliderClasses {
  root: string;
  control: string;
  track: string;
  indicator: string;
  thumb: string;
  value: string;
  tickList: string;
  tick: string;
  valueLabel: string;
}

export interface SliderTickListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SliderValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Thumb index for range sliders. @default 0 */
  index?: number;
}
