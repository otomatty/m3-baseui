/**
 * tv.ts — a tailwind-variants factory pre-configured for the M3 typescale.
 *
 * The Tailwind v4 preset exposes the 15 typescale roles as `text-<role>`
 * font-size utilities (e.g. `text-body-small`, `text-label-large`). Stock
 * tailwind-merge does not know these custom names, so it groups them with the
 * `text-<color>` utilities and drops one when a slot sets both a color *and* a
 * typescale (the common M3 case). That silently strips either the color or the
 * type, breaking token compliance.
 *
 * Teaching tailwind-merge that the typescale names belong to the `font-size`
 * group keeps color and type independent, so both survive the merge.
 */
import { type TV, tv as baseTv } from 'tailwind-variants';

const TYPESCALE = [
  'display-large',
  'display-medium',
  'display-small',
  'headline-large',
  'headline-medium',
  'headline-small',
  'title-large',
  'title-medium',
  'title-small',
  'body-large',
  'body-medium',
  'body-small',
  'label-large',
  'label-medium',
  'label-small',
] as const;

export const tv: TV = (options, config) =>
  baseTv(options, {
    ...config,
    twMergeConfig: {
      extend: {
        classGroups: {
          'font-size': [{ text: [...TYPESCALE] }],
        },
      },
    },
  });
