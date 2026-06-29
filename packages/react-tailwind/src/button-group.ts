/**
 * button-group.ts — tailwind-variants resolver for the M3 ButtonGroup.
 *
 * `standard` lays the buttons out with an 8dp gap; `connected` tightens the gap
 * to 2dp and reduces the children's inner-facing corners to the `small` shape
 * token so the row reads as one connected unit (outer corners stay full). The
 * child selectors carry enough specificity to win over each button's own
 * `rounded-full`. Same DOM + `role="group"` as the VE build.
 */
import { createButtonGroup } from '@m3-baseui/core';
import { tv } from './tv';

export const buttonGroup = tv({
  base: 'inline-flex items-center',
  variants: {
    variant: {
      standard: 'gap-2',
      connected: [
        'gap-0.5',
        '[&>*:not(:first-child):not(:last-child)]:rounded-small',
        '[&>*:first-child]:rounded-e-small',
        '[&>*:last-child]:rounded-s-small',
      ],
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});

export const ButtonGroup = createButtonGroup(({ variant }) => buttonGroup({ variant }));
export type { ButtonGroupProps, ButtonGroupVariant } from '@m3-baseui/core';
