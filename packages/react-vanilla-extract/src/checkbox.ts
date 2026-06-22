/**
 * checkbox.ts — wires the VE styles into the shared factory.
 */
import { createCheckbox } from '@m3/core';
import { root, indicator, icon } from './checkbox.css';

export const Checkbox = createCheckbox({ root, indicator, icon });
