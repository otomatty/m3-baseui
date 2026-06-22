/**
 * switch.ts — wires the VE styles into the shared factory.
 */
import { createSwitch } from '@m3/core';
import { root, thumb } from './switch.css';

export const Switch = createSwitch({ root, thumb });
