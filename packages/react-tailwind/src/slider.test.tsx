import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Slider, sliderTv } from './slider';

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

  test('value label is hidden until the thumb is pressed', () => {
    render(<ValueLabelExample />);
    const label = screen.getByText('40');
    expect(label.hasAttribute('data-visible')).toBe(false);

    fireEvent.pointerDown(screen.getByRole('slider'));
    expect(label.hasAttribute('data-visible')).toBe(true);
  });
});

describe('Slider tokens', () => {
  const s = sliderTv();

  test('active track = primary, inactive track = surface-container-highest', () => {
    expect(s.indicator()).toContain('bg-primary');
    expect(s.track()).toContain('bg-surface-container-highest');
  });

  test('handle = primary with a 40dp primary state layer', () => {
    expect(s.thumb()).toContain('bg-primary');
    expect(s.thumb()).toContain('before:size-10');
    expect(s.thumb()).toContain('before:bg-primary');
    expect(s.thumb()).toContain('group/thumb');
  });

  test('state layer opacities: hover/focus and the dragged (0.16) state layer while dragging', () => {
    // M3 sliders use the dedicated dragged state-layer opacity (0.16) while the
    // handle is being dragged — not the pressed (0.10) value.
    expect(s.thumb()).toContain('hover:before:opacity-[var(--md-sys-state-hover)]');
    expect(s.thumb()).toContain('focus-visible:before:opacity-[var(--md-sys-state-focus)]');
    expect(s.thumb()).toContain('data-[dragging]:before:opacity-[var(--md-sys-state-dragged)]');
    expect(s.thumb()).not.toContain('data-[dragging]:before:opacity-[var(--md-sys-state-pressed)]');
  });

  test('disabled is per-token (no blanket opacity): inactive 0.12 / active+handle 0.38 on-surface', () => {
    // root carries the group hook so descendants can react to data-disabled
    expect(s.root()).toContain('group');
    expect(s.track()).toContain('group-data-[disabled]:bg-on-surface/[0.12]');
    expect(s.indicator()).toContain('group-data-[disabled]:bg-on-surface/[0.38]');
    expect(s.thumb()).toContain('group-data-[disabled]:bg-on-surface/[0.38]');
    // the old blanket opacity is gone
    expect(s.thumb()).not.toContain('data-[disabled]:opacity-[0.38]');
  });

  test('discrete ticks use on-primary on the active track and on-surface-variant elsewhere', () => {
    expect(s.tick()).toContain('bg-on-surface-variant');
    expect(s.tick()).toContain('data-[active]:bg-on-primary/[0.38]');
  });

  test('floating value label uses primary container and on-primary label-large text', () => {
    expect(s.valueLabel()).toContain('bg-primary');
    expect(s.valueLabel()).toContain('text-on-primary');
    expect(s.valueLabel()).toContain('text-label-large');
  });
});
