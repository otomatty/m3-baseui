'use client';
/**
 * create-slider.tsx — headless M3 Slider parts.
 *
 * Base UI Slider composition exposed as a namespace. Track is the inactive rail,
 * Indicator the active fill, Thumb the handle (with a state layer driven by
 * Base UI's data-dragging/hover/focus). Value renders the numeric output.
 */
import { Slider as SliderPrimitive } from '@base-ui/react/slider';

import type { SliderClasses } from './slider.contract';
import { createSlot } from './slot';

export function createSlider(classes: SliderClasses) {
  return {
    Root: createSlot(SliderPrimitive.Root, classes.root),
    Control: createSlot(SliderPrimitive.Control, classes.control),
    Track: createSlot(SliderPrimitive.Track, classes.track),
    Indicator: createSlot(SliderPrimitive.Indicator, classes.indicator),
    Thumb: createSlot(SliderPrimitive.Thumb, classes.thumb),
    Value: createSlot(SliderPrimitive.Value, classes.value),
  };
}
