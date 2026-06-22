/**
 * slider.ts — wires the VE styles into the shared parts factory.
 */
import { createSlider } from '@m3/core';
import { root, control, track, indicator, thumb, value } from './slider.css';

export const Slider = createSlider({ root, control, track, indicator, thumb, value });
