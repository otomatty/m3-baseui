/**
 * button.ts — wires the VE recipe into the shared factory. The factory owns all
 * React logic; only the class resolver differs from the Tailwind build.
 */
import { createButton } from '@m3-baseui/core';
import { button } from './button.css';

/** Map the tri-state `selected` (undefined = plain) to the `toggle` variant. */
const toToggle = (selected: boolean | undefined): 'on' | 'off' | undefined =>
  selected === undefined ? undefined : selected ? 'on' : 'off';

export const Button = createButton(({ variant, size, shape, selected }) =>
  button({ variant, size, shape, toggle: toToggle(selected) }),
);
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonShape } from '@m3-baseui/core';
