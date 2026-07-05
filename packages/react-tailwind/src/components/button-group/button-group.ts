/**
 * button-group.ts — tailwind-variants resolver for the M3 Expressive ButtonGroup.
 *
 * `standard` lays the buttons out with a 12dp gap (`ButtonGroupSmallTokens.BetweenSpace`);
 * `connected` tightens the gap to 2dp and reduces the children's inner-facing
 * corners to the `small` shape token so the row reads as one connected unit
 * (outer corners stay full). Expressive adds three state morphs to `connected`:
 * the seam shrinks to `extra-small` (4dp) on press (`PressedInnerCornerCornerSize`),
 * a selected/toggled child rounds fully (`SelectedInnerCornerCornerSizePercent = 50%`),
 * and the pressed child grows while its neighbours compress
 * (`ButtonGroupDefaults.ExpandedRatio = 0.15`, via `flex-grow` + the fast spatial
 * spring). The child selectors carry enough specificity to win over each button's
 * own `rounded-full`. Same DOM + `role="group"` as the VE build.
 */
import { createButtonGroup } from '@m3-baseui/core';
import { tv } from '../../tv';

export const buttonGroup = tv({
  // `--md-comp-button-group-expanded-ratio` is the Compose `ExpandedRatio` (0.15)
  // kept as a component-level custom property (there is no system token for it).
  base: 'inline-flex items-center [--md-comp-button-group-expanded-ratio:0.15]',
  variants: {
    variant: {
      standard: 'gap-3',
      connected: [
        'gap-0.5',
        // Equal-width flexible segments so the press squeeze can redistribute
        // width; the fast spatial spring animates the growth.
        '[&>*]:flex-1 [&>*]:basis-0 [&>*]:min-w-0',
        '[&>*]:transition-[flex-grow] [&>*]:duration-[var(--md-sys-motion-duration-spring-spatial-fast)] [&>*]:ease-spring-spatial-fast',
        // Static seam (small). Guard against a lone child (first *and* last) so a
        // single button stays fully rounded.
        '[&>*:not(:first-child):not(:last-child)]:rounded-small',
        '[&>*:first-child:not(:last-child)]:rounded-e-small',
        '[&>*:last-child:not(:first-child)]:rounded-s-small',
        // Pressed: seam morphs to extra-small (4dp).
        '[&>*:not(:first-child):not(:last-child):is(:active,[data-pressed])]:rounded-extra-small',
        '[&>*:first-child:not(:last-child):is(:active,[data-pressed])]:rounded-e-extra-small',
        '[&>*:last-child:not(:first-child):is(:active,[data-pressed])]:rounded-s-extra-small',
        // Selected toggle child rounds fully (highest specificity → wins the seam).
        '[&>*[data-selected]:not(:first-child):not(:last-child)]:rounded-full',
        '[&>*[data-selected]:first-child:not(:last-child)]:rounded-e-full',
        '[&>*[data-selected]:last-child:not(:first-child)]:rounded-s-full',
        // Press squeeze: the pressed child grows by the ExpandedRatio; equal-basis
        // neighbours give up the space.
        '[&>*:is(:active,[data-pressed])]:[flex-grow:calc(1+var(--md-comp-button-group-expanded-ratio))]',
      ],
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});

export const ButtonGroup = createButtonGroup(({ variant }) => buttonGroup({ variant }));
export type { ButtonGroupProps, ButtonGroupVariant } from '@m3-baseui/core';
