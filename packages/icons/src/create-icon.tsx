'use client';
import * as React from 'react';

export type IconStyle = 'outlined' | 'rounded' | 'sharp';

export type GetGlyph = (name: string, filled?: boolean) => string | undefined;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'ref'> {
  /** Material Symbols ligature name, e.g. "settings". */
  name: string;
  /** Symbol style. Rounded/sharp currently render the outlined SVG. @default 'outlined' */
  variant?: IconStyle;
  /** Use the FILL 1 glyph. @default false */
  filled?: boolean;
  /** CSS px width/height. @default 24 */
  size?: number;
  /** Ignored. SVG glyphs are weight 400. Kept for source compatibility. */
  weight?: number;
}

export function createIcon(getGlyph: GetGlyph, viewBox: string) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
    {
      name,
      variant = 'outlined',
      filled = false,
      size = 24,
      weight: _weight = 400,
      style,
      ...rest
    },
    ref,
  ) {
    switch (variant) {
      case 'outlined':
      case 'rounded':
      case 'sharp':
        break;
      default: {
        const _exhaustive: never = variant;
        return _exhaustive;
      }
    }

    const d = getGlyph(name, filled);

    return (
      <svg
        aria-hidden="true"
        viewBox={viewBox}
        width={size}
        height={size}
        fill="currentColor"
        style={{ display: 'inline-flex', flexShrink: 0, ...style }}
        {...rest}
        ref={ref}
      >
        {d ? <path d={d} /> : null}
      </svg>
    );
  });
  Icon.displayName = 'M3Icon';
  return Icon;
}
