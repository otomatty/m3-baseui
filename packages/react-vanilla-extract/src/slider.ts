/**
 * slider.ts — wires the VE styles into the shared parts factory.
 */
import { createSlider } from '@otomatty/core';
import { root, control, track, indicator, thumb, value } from './slider.css';

export const Slider = createSlider({ root, control, track, indicator, thumb, value });
