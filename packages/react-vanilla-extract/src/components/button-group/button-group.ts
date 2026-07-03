/**
 * button-group.ts — wires the VE styles into the shared ButtonGroup factory.
 */
import { createButtonGroup, cx } from '@m3-baseui/core';
import { root, standard, connected } from './button-group.css';

const variantClass = { standard, connected } as const;

export const ButtonGroup = createButtonGroup(({ variant }) => cx(root, variantClass[variant]));
export type { ButtonGroupProps, ButtonGroupVariant } from '@m3-baseui/core';
