/**
 * switch.ts — wires the VE styles into the shared factory.
 */
import { createSwitch } from '@otomatty/core';
import { root, thumb, iconChecked, iconUnchecked } from './switch.css';

export const Switch = createSwitch({ root, thumb, iconChecked, iconUnchecked });
