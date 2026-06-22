/**
 * radio.ts — wires the VE styles into the shared factories.
 */
import { createRadio, createRadioGroup } from '@m3/core';
import { root, indicator, group } from './radio.css';

export const Radio = createRadio({ root, indicator });
export const RadioGroup = createRadioGroup(group);
