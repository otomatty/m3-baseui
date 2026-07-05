/**
 * button.ts — wires the VE recipe into the shared factory. The factory owns all
 * React logic; only the class resolver differs from the Tailwind build.
 */
import { createButton, toToggle } from '@m3-baseui/core';
import { button } from './button.css';

export const Button = createButton(({ variant, size, shape, selected }) =>
  button({ variant, size, shape, toggle: toToggle(selected) }),
);
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonShape } from '@m3-baseui/core';
