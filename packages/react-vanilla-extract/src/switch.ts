/**
 * switch.ts — wires the VE styles into the shared factory.
 */
import { createSwitch } from '@m3-baseui/core';
import { root, thumb, iconChecked, iconUnchecked } from './switch.css';

export const Switch = createSwitch({ root, thumb, iconChecked, iconUnchecked });
