import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Slider, sliderTv } from './slider';

function Example(props: { disabled?: boolean }) {
  return (
    <Slider.Root defaultValue={40} disabled={props.disabled}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb />
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
});
