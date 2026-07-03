/**
 * checkbox.ts — wires the VE styles into the shared factory.
 */
import { createCheckbox } from '@m3-baseui/core';
import { root, indicator, icon } from './checkbox.css';

export const Checkbox = createCheckbox({ root, indicator, icon });
