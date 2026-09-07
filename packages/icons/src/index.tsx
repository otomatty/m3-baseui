'use client';
/**
 * @m3-baseui/icons — Material Symbols as inline SVG.
 *
 * Default entry ships only glyphs used by this repo so the consumer bundle
 * stays small. Import `@m3-baseui/icons/all` for the full catalog.
 *
 *   <Icon name="settings" filled />
 */
import { createIcon } from './create-icon';
import { getGlyph, ICON_VIEW_BOX } from './generated/core';

export type { IconProps, IconStyle } from './create-icon';

export const Icon = createIcon(getGlyph, ICON_VIEW_BOX);

export { ICON_VIEW_BOX, getGlyph };
