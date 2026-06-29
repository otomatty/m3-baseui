'use client';
/**
 * create-carousel.tsx — headless M3 Carousel parts (Root + Item).
 *
 * `Root` is the scroll-snap scroller: a focusable `role="group"` with
 * `aria-roledescription="carousel"` (so AT announces it as a carousel) and
 * `tabIndex={0}` so the scrollable region is keyboard-accessible (the arrow keys
 * scroll it). It resolves the
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
    // `tabIndex` defaults to 0 (focusable) but stays caller-overridable.
    { variant = 'multi-browse', className, tabIndex = 0, ...props },
    ref,
  ) {
    const classes = React.useMemo(() => resolve(variant), [variant]);
    return (
      <CarouselClassContext.Provider value={classes}>
        {/* `props` are spread first so the shared DOM/`data-*` contract
            (role, aria-roledescription, data-variant) stays authoritative and a
            caller cannot desync it. The scroller is focusable so the scrollable
            region is keyboard-accessible (axe scrollable-region-focusable). */}
        {/* biome-ignore lint/a11y/useSemanticElements: role=group + aria-roledescription="carousel" is the WAI-ARIA carousel pattern, not a form fieldset. */}
        <div
          {...props}
          ref={ref}
          role="group"
          aria-roledescription="carousel"
          tabIndex={tabIndex}
          data-variant={variant}
          className={cx(classes.root, className)}
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
