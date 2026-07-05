/**
 * tv.ts — a tailwind-variants factory pre-configured for the M3 typescale and
 * shape scale.
 *
 * The Tailwind v4 preset exposes the 15 typescale roles as `text-<role>`
 * font-size utilities (e.g. `text-body-small`, `text-label-large`) and the
 * shape scale as `rounded-<role>` border-radius utilities (e.g. `rounded-small`,
 * `rounded-extra-large`). Stock tailwind-merge does not know these custom names,
 * so it (a) groups the typescale names with `text-<color>` and drops one when a
 * slot sets both a color *and* a typescale, and (b) fails to see two custom
 * `rounded-<role>` classes as conflicting, so a later corner override never
 * dedupes the resting one (both survive, and CSS source order — not intent —
 * decides). Either way token compliance / shape morph silently breaks.
 *
 * Teaching tailwind-merge that the typescale names belong to `font-size` and the
 * shape names belong to `rounded` keeps color and type independent and makes the
 * corner utilities override one another as expected.
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

// M3 shape scale exposed as `rounded-<role>` (see @m3-baseui/tokens theme.css
// `--radius-*`). `none` / `full` overlap stock Tailwind and are harmless to
// re-list; the intermediate roles are what stock tailwind-merge misses.
const SHAPE = [
  'none',
  'extra-small',
  'small',
  'medium',
  'large',
  'large-increased',
  'extra-large',
  'extra-large-increased',
  'full',
] as const;

export const tv: TV = (options, config) =>
  baseTv(options, {
    ...config,
    twMergeConfig: {
      extend: {
        classGroups: {
          'font-size': [{ text: [...TYPESCALE] }],
          rounded: [{ rounded: [...SHAPE] }],
        },
      },
    },
  });
