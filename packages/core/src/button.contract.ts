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

/** Arguments handed to an engine's class resolver. */
export interface ButtonResolverArgs {
  variant: ButtonVariant;
}

/** A function that turns variant state into a class string for one engine. */
export type ButtonClassResolver = (args: ButtonResolverArgs) => string;

/** Props owned by the M3 Button (beyond native <button> attributes). */
export interface ButtonOwnProps {
  /** M3 button variant. @default 'filled' */
  variant?: ButtonVariant;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
