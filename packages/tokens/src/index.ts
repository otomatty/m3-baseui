/**
 * @m3/tokens — public entry.
 *
 * Exposes the raw token source (the single source of truth) plus its types.
 * Generated artifacts are consumed via subpath exports:
 *   '@m3/tokens/tokens.css'    runtime CSS variables
 *   '@m3/tokens/theme.css'     Tailwind v4 @theme preset
 *   '@m3/tokens/contract.css'  vanilla-extract typed contract
 */
export { tokens } from './tokens';
export type { AppTokens } from './tokens';
export type {
  Tokens,
  SysTokens,
  ColorModeValue,
  TypescaleRole,
  MotionTokens,
  ChannelTriple,
} from './types';

/** Stable list of M3 system color role names (kebab keys minus prefix). */
export { tokens as default } from './tokens';
