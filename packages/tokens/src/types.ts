/**
 * Type definitions for the M3 token source.
 *
 * The token source is the single source of truth. Types here are intentionally
 * light so that the *values* in `tokens.ts` drive inference (`as const`),
 * avoiding a hand-written second definition that can drift.
 */

/** A color value held as an "R G B" channel triple (space separated). */
export type ChannelTriple = string;

/** A color role that resolves differently in light and dark schemes. */
export interface ColorModeValue {
  light: ChannelTriple;
  dark: ChannelTriple;
}

/** A single typescale role definition. */
export interface TypescaleRole {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

/** Easing + duration motion tokens. */
export interface MotionTokens {
  easing: Record<string, string>;
  duration: Record<string, string>;
}

export interface SysTokens {
  color: Record<string, ColorModeValue>;
  typescale: Record<string, TypescaleRole>;
  shape: Record<string, string>;
  elevation: Record<string, string>;
  state: Record<string, string>;
  motion: MotionTokens;
}

export interface Tokens {
  sys: SysTokens;
}
