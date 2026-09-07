'use client';
/**
 * Full Material Symbols catalog (outlined, weight 400). Prefer the default
 * `@m3-baseui/icons` entry unless you need an icon outside that subset.
 */
import { createIcon } from './create-icon';
import { getGlyph, ICON_VIEW_BOX } from './generated/all';

export type { IconProps, IconStyle } from './create-icon';

export const Icon = createIcon(getGlyph, ICON_VIEW_BOX);

export { ICON_VIEW_BOX, getGlyph };
