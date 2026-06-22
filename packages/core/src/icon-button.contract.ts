/**
 * icon-button.contract.ts — variant set and props for the M3 Icon Button.
 *
 * Like Button, this is a single-element component; the contract is shared so
 * variant names and prop types are written once for both styling engines.
 */
import type * as React from 'react';

export const ICON_BUTTON_VARIANTS = ['standard', 'filled', 'tonal', 'outlined'] as const;
export type IconButtonVariant = (typeof ICON_BUTTON_VARIANTS)[number];

export interface IconButtonResolverArgs {
  variant: IconButtonVariant;
  /**
   * Toggle selection state. `undefined` means a plain (non-toggle) icon button,
   * which uses each variant's default appearance.
   */
  selected: boolean | undefined;
}

export type IconButtonClassResolver = (args: IconButtonResolverArgs) => string;

export interface IconButtonOwnProps {
  /** M3 icon-button variant. @default 'standard' */
  variant?: IconButtonVariant;
  /**
   * Selected state for toggle icon buttons. When provided, the button gets
   * `aria-pressed` and a `data-selected` attribute for styling.
   */
  selected?: boolean;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export type IconButtonProps = IconButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
