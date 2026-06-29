/**
 * button-group.contract.ts — variant set + props for the M3 ButtonGroup.
 *
 * `labs/buttongroup`: a row of related buttons. `standard` keeps the buttons
 * spaced; `connected` packs them together and morphs the children's
 * inner-facing corners so the row reads as one unit (the outer corners stay
 * full). One class resolver per engine keeps both builds drop-in compatible.
 */
import type * as React from 'react';

export const BUTTON_GROUP_VARIANTS = ['standard', 'connected'] as const;
export type ButtonGroupVariant = (typeof BUTTON_GROUP_VARIANTS)[number];

/** Arguments handed to an engine's class resolver. */
export interface ButtonGroupResolverArgs {
  variant: ButtonGroupVariant;
}

/** A function that turns the variant state into a class string for one engine. */
export type ButtonGroupClassResolver = (args: ButtonGroupResolverArgs) => string;

/** Props owned by the M3 ButtonGroup (beyond native <div> attributes). */
export interface ButtonGroupOwnProps {
  /**
   * Layout configuration. `standard` spaces the buttons; `connected` packs
   * them together with shared shape. @default 'standard'
   */
  variant?: ButtonGroupVariant;
}

export type ButtonGroupProps = ButtonGroupOwnProps & React.HTMLAttributes<HTMLDivElement>;
