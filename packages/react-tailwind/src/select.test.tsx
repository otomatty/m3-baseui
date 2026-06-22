import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Select, selectTv } from './select';

function Example(props: { disabled?: boolean }) {
  return (
    <Select.Root defaultValue="a" disabled={props.disabled}>
      <Select.Trigger>
        <Select.Value />
        <Select.Icon />
      </Select.Trigger>
    </Select.Root>
  );
}

describe('Select', () => {
  test('renders a combobox trigger', () => {
    render(<Example />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('disabled trigger carries data-disabled', () => {
    render(<Example disabled />);
    expect(screen.getByRole('combobox')).toHaveAttribute('data-disabled');
  });
});

describe('Select tokens', () => {
  const s = selectTv();

  test('outlined trigger: 56dp, extra-small corner, 1dp outline, focus = 3dp primary', () => {
    expect(s.trigger()).toContain('h-14');
    expect(s.trigger()).toContain('rounded-extra-small');
    expect(s.trigger()).toContain('border-outline');
    // M3 outlined field focus/open border is 3px (not 2px), padding compensates 2px
    expect(s.trigger()).toContain('data-[popup-open]:border-[3px]');
    expect(s.trigger()).toContain('data-[popup-open]:px-[14px]');
    expect(s.trigger()).toContain('focus-visible:border-[3px]');
    expect(s.trigger()).not.toContain('border-2');
  });

  test('disabled is per-token: outline on-surface/0.12, text on-surface/0.38', () => {
    expect(s.trigger()).toContain('data-[disabled]:border-on-surface/[0.12]');
    expect(s.trigger()).toContain('data-[disabled]:text-on-surface/[0.38]');
    expect(s.trigger()).not.toContain('data-[disabled]:opacity-[0.38]');
    // leading/trailing icon also dims per-token
    expect(s.icon()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
  });

  test('popup follows the M3 menu surface', () => {
    expect(s.popup()).toContain('bg-surface-container');
    expect(s.popup()).toContain('shadow-level2');
    expect(s.popup()).toContain('rounded-extra-small');
  });

  test('scroll arrows stick to the popup edges with the surface color', () => {
    expect(s.scrollUpArrow()).toContain('sticky');
    expect(s.scrollUpArrow()).toContain('top-0');
    expect(s.scrollUpArrow()).toContain('bg-surface-container');
    expect(s.scrollDownArrow()).toContain('bottom-0');
  });

  test('item reserves a trailing supporting-text slot', () => {
    expect(s.item()).toContain('grid-cols-[24px_1fr_auto]');
    expect(s.item()).toContain('[&_[data-slot=select-trailing]]:text-on-surface-variant');
  });

  test('disabled item is per-token (no blanket opacity): label + trailing on-surface/0.38, no state layer', () => {
    expect(s.item()).toContain('data-[disabled]:text-on-surface/[0.38]');
    expect(s.item()).toContain('data-[disabled]:before:opacity-0');
    expect(s.item()).toContain(
      'data-[disabled]:[&_[data-slot=select-trailing]]:text-on-surface/[0.38]',
    );
    expect(s.item()).not.toContain('data-[disabled]:opacity-[0.38]');
  });
});

describe('Select parts', () => {
  test('namespace exposes the scroll arrow parts', () => {
    expect(Select.ScrollUpArrow).toBeDefined();
    expect(Select.ScrollDownArrow).toBeDefined();
  });
});
