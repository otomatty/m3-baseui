'use client';
/**
 * create-slider.tsx — headless M3 Slider parts.
 *
 * Base UI Slider composition exposed as a namespace. Track is the inactive rail,
 * Indicator the active fill, Thumb the handle (with a state layer driven by
 * Base UI's data-dragging/hover/focus). Value renders inline numeric output;
 * ValueLabel is the M3 floating label shown while a thumb is pressed or dragged.
 * TickList renders discrete stop indicators aligned to `step`.
 */
import * as React from 'react';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import type { SliderRoot } from '@base-ui/react/slider';

import type { SliderClasses, SliderTickListProps, SliderValueLabelProps } from './slider.contract';
import { mergeClassName } from './slot';
import { cx } from './utils';

const ThumbPressContext = React.createContext(false);
const ThumbIndexContext = React.createContext(0);

interface M3SliderContextValue {
  state: SliderRoot.State;
  locale?: Intl.LocalesArgument;
  format?: Intl.NumberFormatOptions;
}

const M3SliderContext = React.createContext<M3SliderContextValue | null>(null);

function useM3SliderContext(): M3SliderContextValue {
  const context = React.useContext(M3SliderContext);
  if (context == null) {
    throw new Error('M3 Slider parts must be placed within <Slider.Root>.');
  }
  return context;
}

function valueToPercent(value: number, min: number, max: number): number {
  if (max <= min) {
    return 0;
  }
  return ((value - min) / (max - min)) * 100;
}

function getDecimalPrecision(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  let factor = 1;
  let precision = 0;
  while (Math.round(value * factor) / factor !== value) {
    factor *= 10;
    precision++;
  }
  return precision;
}

function getDiscreteTickValues(min: number, max: number, step: number): number[] {
  if (step <= 0) {
    return [];
  }
  const precision = Math.max(
    getDecimalPrecision(step),
    getDecimalPrecision(min),
    getDecimalPrecision(max),
  );
  const ticks: number[] = [];
  for (let value = min; value <= max + step / 2; value += step) {
    const rounded = Number(value.toFixed(precision));
    if (rounded > max) {
      break;
    }
    ticks.push(rounded);
  }
  return ticks;
}

function isTickActive(tickValue: number, values: readonly number[]): boolean {
  if (values.length > 1) {
    const low = Math.min(...values);
    const high = Math.max(...values);
    return tickValue >= low && tickValue <= high;
  }
  const current = values[0];
  if (current == null) {
    return false;
  }
  return tickValue <= current;
}

function formatSliderValue(
  value: number,
  locale: Intl.LocalesArgument | undefined,
  format: Intl.NumberFormatOptions | undefined,
): string {
  return new Intl.NumberFormat(locale, format).format(value);
}

type SliderRootRender = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>['render'];

function renderSliderRoot(
  rootProps: React.ComponentPropsWithoutRef<'div'> & { ref?: React.Ref<HTMLElement> },
  state: SliderRoot.State,
  render: SliderRootRender,
): React.ReactElement {
  if (typeof render === 'function') {
    return render(rootProps, state);
  }
  if (render != null) {
    return React.cloneElement(render, rootProps);
  }
  return React.createElement('div', rootProps);
}

export function createSlider(classes: SliderClasses) {
  const Root = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
  >(function Root({ className, format, locale, render, ...props }, ref) {
    return (
      <SliderPrimitive.Root
        ref={ref}
        format={format}
        locale={locale}
        {...props}
        className={mergeClassName(classes.root, className)}
        render={(rootProps, state) => {
          const element = renderSliderRoot(rootProps, state, render);
          return (
            <M3SliderContext.Provider value={{ state, locale, format }}>
              {element}
            </M3SliderContext.Provider>
          );
        }}
      />
    );
  });
  Root.displayName = 'M3Slider.Root';

  const Control = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Control>
  >(function Control({ className, ...props }, ref) {
    return (
      <SliderPrimitive.Control
        ref={ref}
        className={mergeClassName(classes.control, className)}
        {...props}
      />
    );
  });
  Control.displayName = 'M3Slider.Control';

  const Track = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
  >(function Track({ className, ...props }, ref) {
    return (
      <SliderPrimitive.Track
        ref={ref}
        className={mergeClassName(classes.track, className)}
        {...props}
      />
    );
  });
  Track.displayName = 'M3Slider.Track';

  const Indicator = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Indicator>
  >(function Indicator({ className, ...props }, ref) {
    return (
      <SliderPrimitive.Indicator
        ref={ref}
        className={mergeClassName(classes.indicator, className)}
        {...props}
      />
    );
  });
  Indicator.displayName = 'M3Slider.Indicator';

  const Value = React.forwardRef<
    HTMLOutputElement,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Value>
  >(function Value({ className, ...props }, ref) {
    return (
      <SliderPrimitive.Value
        ref={ref}
        className={mergeClassName(classes.value, className)}
        {...props}
      />
    );
  });
  Value.displayName = 'M3Slider.Value';

  const TickList = React.forwardRef<HTMLDivElement, SliderTickListProps>(function TickList(
    { className, ...props },
    ref,
  ) {
    const {
      state: { max, min, orientation, step, values },
    } = useM3SliderContext();
    const ticks = React.useMemo(() => getDiscreteTickValues(min, max, step), [min, max, step]);
    const vertical = orientation === 'vertical';

    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-discrete=""
        className={cx(classes.tickList, className)}
        {...props}
      >
        {ticks.map((tickValue) => {
          const percent = valueToPercent(tickValue, min, max);
          const active = isTickActive(tickValue, values);
          return (
            <span
              key={tickValue}
              data-tick=""
              data-active={active ? '' : undefined}
              className={classes.tick}
              style={
                vertical
                  ? { bottom: `${percent}%`, left: '50%' }
                  : { left: `${percent}%`, top: '50%' }
              }
            />
          );
        })}
      </div>
    );
  });
  TickList.displayName = 'M3Slider.TickList';

  const ValueLabel = React.forwardRef<HTMLSpanElement, SliderValueLabelProps>(function ValueLabel(
    { className, index: indexProp, ...props },
    ref,
  ) {
    const pressed = React.useContext(ThumbPressContext);
    const inheritedIndex = React.useContext(ThumbIndexContext);
    const index = indexProp ?? inheritedIndex;
    const {
      format,
      locale,
      state: { activeThumbIndex, dragging, values },
    } = useM3SliderContext();
    const value = values[index] ?? values[0];
    if (value == null) {
      return null;
    }
    const formatted = formatSliderValue(value, locale, format);
    const visible = pressed || (dragging && activeThumbIndex === index);

    return (
      <span
        ref={ref}
        aria-hidden="true"
        data-visible={visible ? '' : undefined}
        className={cx(classes.valueLabel, className)}
        {...props}
      >
        {formatted}
      </span>
    );
  });
  ValueLabel.displayName = 'M3Slider.ValueLabel';

  const Thumb = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
  >(function Thumb(
    { className, children, index, onPointerCancel, onPointerDown, onPointerUp, ...props },
    ref,
  ) {
    const [pressed, setPressed] = React.useState(false);

    React.useEffect(() => {
      if (!pressed) {
        return undefined;
      }
      const clear = () => setPressed(false);
      document.addEventListener('pointerup', clear);
      document.addEventListener('pointercancel', clear);
      return () => {
        document.removeEventListener('pointerup', clear);
        document.removeEventListener('pointercancel', clear);
      };
    }, [pressed]);

    return (
      <ThumbIndexContext.Provider value={index ?? 0}>
        <ThumbPressContext.Provider value={pressed}>
          <SliderPrimitive.Thumb
            ref={ref}
            {...(index !== undefined ? { index } : {})}
            className={mergeClassName(classes.thumb, className)}
            onPointerCancel={(event) => {
              setPressed(false);
              onPointerCancel?.(event);
            }}
            onPointerDown={(event) => {
              setPressed(true);
              onPointerDown?.(event);
            }}
            onPointerUp={(event) => {
              setPressed(false);
              onPointerUp?.(event);
            }}
            {...props}
          >
            {children}
          </SliderPrimitive.Thumb>
        </ThumbPressContext.Provider>
      </ThumbIndexContext.Provider>
    );
  });
  Thumb.displayName = 'M3Slider.Thumb';

  return {
    Root,
    Control,
    Track,
    Indicator,
    Thumb,
    Value,
    TickList,
    ValueLabel,
  };
}
