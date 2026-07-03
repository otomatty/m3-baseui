/**
 * button.ts — wires the VE recipe into the shared factory. The factory owns all
 * React logic; only the class resolver differs from the Tailwind build.
 */
import { createButton } from '@m3-baseui/core';
import { button } from './button.css';

export const Button = createButton(({ variant }) => button({ variant }));
export type { ButtonProps, ButtonVariant } from '@m3-baseui/core';
