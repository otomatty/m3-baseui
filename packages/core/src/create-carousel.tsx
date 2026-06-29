'use client';
/**
 * create-carousel.tsx — headless M3 Carousel parts (Root + Item).
 *
 * `Root` is the scroll-snap scroller: a `role="group"` with
 * `aria-roledescription="carousel"` (so AT announces it as a carousel). Pass
 * `tabIndex={0}` to make it arrow-key scrollable. It resolves the
 * `variant`'s slot classes once and shares them with the items via context
 * (mirrors Tabs), and mirrors the variant onto `data-variant` for CSS. `Item` is
 * a snap-aligned cell. Each engine injects the slot classes, so the DOM stays
 * identical between builds.
 */
import * as React from 'react';

import type {
  CarouselClassResolver,
  CarouselSlotClasses,
  CarouselVariant,
} from './carousel.contract';
import { cx } from './utils';

const CarouselClassContext = React.createContext<CarouselSlotClasses | null>(null);

/** Read the variant's slot classes shared by `Carousel.Root`; throws if used outside. */
function useCarouselClasses(): CarouselSlotClasses {
  const ctx = React.useContext(CarouselClassContext);
  if (!ctx) throw new Error('Carousel parts must be used within <Carousel.Root>.');
  return ctx;
}

type RootProps = React.HTMLAttributes<HTMLDivElement> & {
  /** M3 carousel layout. @default 'multi-browse' */
  variant?: CarouselVariant;
};
type ItemProps = React.HTMLAttributes<HTMLDivElement>;

export function createCarousel(resolve: CarouselClassResolver) {
  /** The scroll-snap scroller; shares the resolved variant classes via context. */
  const Root = React.forwardRef<HTMLDivElement, RootProps>(function Root(
    { variant = 'multi-browse', className, ...props },
    ref,
  ) {
    const classes = React.useMemo(() => resolve(variant), [variant]);
    return (
      <CarouselClassContext.Provider value={classes}>
        {/* biome-ignore lint/a11y/useSemanticElements: role=group + aria-roledescription="carousel" is the WAI-ARIA carousel pattern, not a form fieldset. */}
        <div
          ref={ref}
          role="group"
          aria-roledescription="carousel"
          data-variant={variant}
          className={cx(classes.root, className)}
          {...props}
        />
      </CarouselClassContext.Provider>
    );
  });
  Root.displayName = 'M3Carousel.Root';

  /** A single snap-aligned carousel cell. */
  const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
    { className, ...props },
    ref,
  ) {
    const classes = useCarouselClasses();
    return <div ref={ref} className={cx(classes.item, className)} {...props} />;
  });
  Item.displayName = 'M3Carousel.Item';

  return { Root, Item };
}
