'use client';
/**
 * create-carousel.tsx — headless M3 Carousel parts (Root + Item).
 *
 * `Root` is the scroll-snap scroller: a focusable `role="group"` with
 * `aria-roledescription="carousel"` (the M3 carousel semantic role, so AT
 * announces it as a carousel) and `tabIndex={0}` so the scrollable region is
 * keyboard-accessible. Arrow keys along the scroll axis (←/→, or ↑/↓ for
 * `full-screen`) advance one item at a time via `scrollBy`, honoring
 * `prefers-reduced-motion` for the scroll animation. It resolves the `variant`'s
 * slot classes once and shares them with the items via context (mirrors Tabs),
 * and mirrors the variant onto `data-variant` for CSS. `Item` is a snap-aligned
 * cell. Keyboard navigation lives here in `@m3-baseui/core`, so both engines
 * emit the same DOM, `data-*`, and behavior.
 */
import * as React from 'react';

import type { CarouselClassResolver, CarouselSlotClasses, CarouselVariant } from './contract';
import { cx } from '../../utils';

const CarouselClassContext = React.createContext<CarouselSlotClasses | null>(null);

/** Read the variant's slot classes shared by `Carousel.Root`; throws if used outside. */
function useCarouselClasses(): CarouselSlotClasses {
  const ctx = React.useContext(CarouselClassContext);
  if (!ctx) throw new Error('Carousel parts must be used within <Carousel.Root>.');
  return ctx;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Distance to the next snap cell: first item's extent plus the flex gap. */
function itemStep(el: HTMLElement, vertical: boolean): number {
  const first = el.firstElementChild as HTMLElement | null;
  if (!first) return vertical ? el.clientHeight : el.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(el).gap) || 0;
  return (vertical ? first.offsetHeight : first.offsetWidth) + gap;
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
    { variant = 'multi-browse', className, tabIndex = 0, onKeyDown, ...props },
    ref,
  ) {
    const classes = React.useMemo(() => resolve(variant), [variant]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        // Only steer the scroller itself — arrows on a focusable child (a link
        // inside a slide) belong to that child. Respect a caller opt-out too.
        if (event.defaultPrevented || event.currentTarget !== event.target) return;
        const vertical = variant === 'full-screen';
        const forward = vertical ? 'ArrowDown' : 'ArrowRight';
        const backward = vertical ? 'ArrowUp' : 'ArrowLeft';
        if (event.key !== forward && event.key !== backward) return;
        event.preventDefault();
        const el = event.currentTarget;
        const delta = (event.key === forward ? 1 : -1) * itemStep(el, vertical);
        const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
        el.scrollBy?.(vertical ? { top: delta, behavior } : { left: delta, behavior });
      },
      [onKeyDown, variant],
    );

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
          onKeyDown={handleKeyDown}
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
