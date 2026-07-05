import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Slider, sliderTv } from '../slider/slider';

function Example(props: { disabled?: boolean }) {
  return (
    <Slider.Root defaultValue={40} disabled={props.disabled}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="音量" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

function DiscreteExample() {
  return (
    <Slider.Root defaultValue={50} min={0} max={100} step={25}>
      <Slider.Control>
        <Slider.Track>
          <Slider.TickList />
          <Slider.Indicator />
          <Slider.Thumb aria-label="離散スライダー" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

function RangeExample() {
  return (
    <Slider.Root defaultValue={[25, 75]} min={0} max={100} step={5} aria-label="価格帯">
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb index={0} aria-label="最低価格" />
          <Slider.Thumb index={1} aria-label="最高価格" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

function ValueLabelExample() {
  return (
    <Slider.Root defaultValue={40}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="値ラベル付き">
            <Slider.ValueLabel />
          </Slider.Thumb>
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}

describe('Slider', () => {
  test('exposes the slider role', () => {
    render(<Example />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  test('propagates data-disabled to the root', () => {
    const { container } = render(<Example disabled />);
    expect(container.querySelector('[data-disabled]')).not.toBeNull();
  });

  test('discrete tick list renders a stop indicator per step', () => {
    const { container } = render(<DiscreteExample />);
    const ticks = container.querySelectorAll('[data-tick]');
    expect(ticks.length).toBe(5);
  });

  test('discrete ticks mark the active track span with data-active', () => {
    const { container } = render(<DiscreteExample />);
    const activeTicks = container.querySelectorAll('[data-tick][data-active]');
    expect(activeTicks.length).toBe(3);
  });

  test('range slider exposes two thumbs with aria-valuenow/min/max', () => {
    render(<RangeExample />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);

    expect(sliders[0]?.getAttribute('aria-valuenow')).toBe('25');
    expect(sliders[1]?.getAttribute('aria-valuenow')).toBe('75');
    expect(sliders[0]?.getAttribute('min')).toBe('0');
    expect(sliders[1]?.getAttribute('max')).toBe('100');
  });

  test('range thumbs carry data-index for drop-in parity', () => {
    const { container } = render(<RangeExample />);
    expect(container.querySelector('[data-index="0"]')).not.toBeNull();
    expect(container.querySelector('[data-index="1"]')).not.toBeNull();
  });

  test('value label renders the formatted thumb value', () => {
    render(<ValueLabelExample />);
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  test('value label inherits the parent thumb index in range sliders', () => {
    render(
      <Slider.Root defaultValue={[25, 75]} min={0} max={100}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb index={1} aria-label="最高価格">
              <Slider.ValueLabel />
            </Slider.Thumb>
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>,
    );
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  test('single slider marks the active end for the handle gap', () => {
    const { container } = render(<Example />);
    // The track carries the active-end fraction so the inactive rail can start a
    // handle gap past it; a single slider is not a range.
    expect(container.querySelector('[style*="--m3-slider-end: 40%"]')).not.toBeNull();
    expect(container.querySelector('[data-range]')).toBeNull();
  });

  test('range slider flags data-range on the root for the two-sided gap', () => {
    const { container } = render(<RangeExample />);
    expect(container.querySelector('[data-range]')).not.toBeNull();
    // active region spans 25%→75%
    expect(container.querySelector('[style*="--m3-slider-start: 25%"]')).not.toBeNull();
    expect(container.querySelector('[style*="--m3-slider-end: 75%"]')).not.toBeNull();
  });

  test('value label is hidden until the thumb is pressed', () => {
    render(<ValueLabelExample />);
    const label = screen.getByText('40');
    expect(label.hasAttribute('data-visible')).toBe(false);

    fireEvent.pointerDown(screen.getByRole('slider'));
    expect(label.hasAttribute('data-visible')).toBe(true);
    fireEvent.pointerUp(document);
    expect(label.hasAttribute('data-visible')).toBe(false);
  });
});

describe('Slider tokens (M3 Expressive)', () => {
  const s = sliderTv();

  test('16dp track: control ≥44dp tall, track 16dp', () => {
    // Expressive: InactiveTrackHeight/ActiveTrackHeight = 16dp; the 44dp handle
    // sets the control (touch) height.
    expect(s.control()).toContain('h-11');
    expect(s.track()).toContain('h-4');
  });

  test('active track = primary, inactive track = secondary-container', () => {
    // Active fill is the indicator (primary). The inactive rail is drawn on the
    // track pseudos (secondary-container) so the handle gaps stay transparent.
    expect(s.indicator()).toContain('bg-primary');
    expect(s.track()).toContain('before:bg-secondary-container');
    expect(s.track()).toContain('after:bg-secondary-container');
    // the M3 2021 surface-container-highest rail is gone
    expect(s.track()).not.toContain('bg-surface-container-highest');
  });

  test('bar handle: 4×44dp, CornerFull, no state layer', () => {
    expect(s.thumb()).toContain('w-1');
    expect(s.thumb()).toContain('h-11');
    expect(s.thumb()).toContain('rounded-full');
    expect(s.thumb()).toContain('bg-primary');
    // the 20dp circular thumb + 40dp state layer is gone
    expect(s.thumb()).not.toContain('before:size-10');
    expect(s.thumb()).not.toContain('group/thumb');
  });

  test('handle shrinks to 2dp on pressed/focus (hover stays 4dp) via fast-spatial spring', () => {
    // PressedHandleWidth / FocusHandleWidth = 2dp; HoverHandleWidth stays 4dp.
    expect(s.thumb()).toContain('data-[dragging]:w-0.5');
    expect(s.thumb()).toContain('focus-visible:w-0.5');
    expect(s.thumb()).toContain('transition-[width]');
    expect(s.thumb()).toContain('ease-spring-spatial-fast');
    expect(s.thumb()).toContain('duration-[var(--md-sys-motion-duration-spring-spatial-fast)]');
    // no leftover state-layer opacity transitions
    expect(s.thumb()).not.toContain('data-[dragging]:before:opacity-[var(--md-sys-state-dragged)]');
  });

  test('6dp handle gap + 2dp inside corner on active/inactive tracks', () => {
    // Active fill trims to a 2dp inner corner; the inactive rail starts a
    // handle-gap (6dp + half the 4dp handle = 8px) past the active end.
    expect(s.indicator()).toContain('rounded-e-[2px]');
    expect(s.track()).toContain('before:[inset-inline-start:calc(var(--m3-slider-end)_+_8px)]');
    expect(s.track()).toContain('before:rounded-s-[2px]');
  });

  test('disabled is per-token: inactive 0.12 / active+handle 0.38 on-surface', () => {
    // root carries the group hook so descendants can react to data-disabled
    expect(s.root()).toContain('group');
    expect(s.track()).toContain('group-data-[disabled]:before:bg-on-surface/[0.12]');
    expect(s.track()).toContain('group-data-[disabled]:after:bg-on-surface/[0.12]');
    expect(s.indicator()).toContain('group-data-[disabled]:bg-on-surface/[0.38]');
    expect(s.thumb()).toContain('group-data-[disabled]:bg-on-surface/[0.38]');
  });

  test('stop dots reverse: primary on inactive track, secondary-container on active, on-surface disabled', () => {
    expect(s.tick()).toContain('bg-primary');
    expect(s.tick()).toContain('data-[active]:bg-secondary-container');
    expect(s.tick()).toContain('group-data-[disabled]:bg-on-surface');
    // the M3 2021 tick colors are gone
    expect(s.tick()).not.toContain('bg-on-surface-variant');
    expect(s.tick()).not.toContain('data-[active]:bg-on-primary/[0.38]');
  });

  test('value indicator uses inverse-surface container + inverse-on-surface text, 12dp bottom space', () => {
    expect(s.valueLabel()).toContain('bg-inverse-surface');
    expect(s.valueLabel()).toContain('text-inverse-on-surface');
    expect(s.valueLabel()).toContain('text-label-large');
    expect(s.valueLabel()).toContain('mb-3');
    expect(s.valueLabel()).not.toContain('bg-primary');
  });
});
