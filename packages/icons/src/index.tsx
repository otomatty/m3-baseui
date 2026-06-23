'use client';
/**
 * @otomatty/icons — thin wrapper over Material Symbols (variable font).
 *
 * Load the font in your app (e.g. via Google Fonts):
 *   <link rel="stylesheet"
 *     href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
 *
 * Then: <Icon name="settings" filled />
 */
import type * as React from 'react';

export type IconStyle = 'outlined' | 'rounded' | 'sharp';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols ligature name, e.g. "settings". */
  name: string;
  /** Symbol style family. @default 'outlined' */
  variant?: IconStyle;
  /** Fill the glyph. @default false */
  filled?: boolean;
  /** Optical size in px (20–48). @default 24 */
  size?: number;
  /** Weight (100–700). @default 400 */
  weight?: number;
}

const FAMILY: Record<IconStyle, string> = {
  outlined: 'Material Symbols Outlined',
  rounded: 'Material Symbols Rounded',
  sharp: 'Material Symbols Sharp',
};

export function Icon({
  name,
  variant = 'outlined',
  filled = false,
  size = 24,
  weight = 400,
  style,
  ...rest
}: IconProps): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      {...rest}
      style={{
        fontFamily: FAMILY[variant],
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1,
        display: 'inline-flex',
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'opsz' ${size}`,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
