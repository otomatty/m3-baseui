/**
 * button.ts — wires the VE recipe into the shared factory. The factory owns all
 * React logic; only the class resolver differs from the Tailwind build.
 */
import { createButton } from '@otomatty/core';
import { button } from './button.css';

export const Button = createButton(({ variant }) => button({ variant }));
export type { ButtonProps, ButtonVariant } from '@otomatty/core';
