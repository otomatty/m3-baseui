/**
 * button.contract.ts — the single definition of Button's variant set and props.
 *
 * Both engine implementations (vanilla-extract, Tailwind) import these so the
 * variant names and prop types are never written twice. The class *resolver*
 * differs per engine; the contract does not.
 */
import type * as React from 'react';

export const BUTTON_VARIANTS = ['filled', 'tonal', 'outlined', 'elevated', 'text'] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/** M3 Expressive container sizes (xs 32dp → xl 136dp tall). */
export const BUTTON_SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

/** M3 Expressive container shapes: `round` = full pill, `square` = rounded box. */
export const BUTTON_SHAPES = ['round', 'square'] as const;
export type ButtonShape = (typeof BUTTON_SHAPES)[number];

/** Arguments handed to an engine's class resolver. */
export interface ButtonResolverArgs {
  variant: ButtonVariant;
  /** Container size. @default 's' (40dp, the M3 baseline). */
  size: ButtonSize;
  /** Resting container shape. @default 'round'. */
  shape: ButtonShape;
  /**
   * Toggle selection state. `undefined` means a plain (non-toggle) button,
   * which uses each variant's default appearance.
   */
  selected: boolean | undefined;
}

/** A function that turns variant state into a class string for one engine. */
export type ButtonClassResolver = (args: ButtonResolverArgs) => string;

/**
 * Map the tri-state `selected` prop to a toggle key. `undefined` (a plain,
 * non-toggle button) returns `undefined` so an engine's `toggle` variant stays
 * unset — neither the selected nor unselected look is applied. Shared here so
 * both engines convert identically (engine packages only swap the resolver).
 */
export const toToggle = (selected: boolean | undefined): 'on' | 'off' | undefined =>
  selected === undefined ? undefined : selected ? 'on' : 'off';

/** Props owned by the M3 Button (beyond native <button> attributes). */
export interface ButtonOwnProps {
  /** M3 button variant. @default 'filled' */
  variant?: ButtonVariant;
  /** Container size (M3 Expressive). @default 's' */
  size?: ButtonSize;
  /** Resting container shape (M3 Expressive). @default 'round' */
  shape?: ButtonShape;
  /**
   * Selected state for toggle buttons. When provided, the button gets
   * `aria-pressed` and a `data-selected` attribute for styling, and morphs to
   * the opposite shape while selected.
   */
  selected?: boolean;
  /** Leading icon (sized per `size`). */
  startIcon?: React.ReactNode;
  /** Trailing icon (sized per `size`). */
  endIcon?: React.ReactNode;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
