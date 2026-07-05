import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Select, selectTv } from '../select/select';

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

function OpenableExample() {
  return (
    <Select.Root defaultValue="a">
      <Select.Trigger aria-label="果物">
        <Select.Value />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="a">
              <Select.ItemText>りんご</Select.ItemText>
            </Select.Item>
            <Select.Item value="b">
              <Select.ItemText>バナナ</Select.ItemText>
            </Select.Item>
            <Select.Item value="c">
              <Select.ItemText>さくらんぼ</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
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

  test('popup positions below the trigger without Base UI overlap mode (M3 menu)', async () => {
    render(<OpenableExample />);
    fireEvent.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(document.querySelector('[data-side="bottom"]')).not.toBeNull();
    });
    expect(document.querySelector('[data-side="none"]')).toBeNull();
  });

  test('stamps data-position on each list item (issue #98)', async () => {
    render(<OpenableExample />);
    fireEvent.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(screen.getAllByRole('option')).toHaveLength(3);
    });
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('data-position', 'first');
    expect(options[1]).toHaveAttribute('data-position', 'middle');
    expect(options[2]).toHaveAttribute('data-position', 'last');
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

  test('popup width follows M3 menu bounds (112–280dp, at least anchor)', () => {
    expect(s.popup()).toContain('min-w-[max(112px,var(--anchor-width))]');
    expect(s.popup()).toContain('max-w-[280px]');
  });

  test('selectable item matches M3 menu item: label-large, on-surface check, selected fill', () => {
    expect(s.item()).toContain('text-label-large');
    expect(s.item()).not.toContain('text-body-large');
    expect(s.item()).toContain('data-[selected]:bg-secondary-container');
    expect(s.item()).toContain('data-[selected]:text-on-secondary-container');
    expect(s.item()).toContain('data-[selected]:data-[position=only]:rounded-extra-small');
    expect(s.item()).toContain('data-[selected]:data-[position=first]:rounded-t-extra-small');
    expect(s.item()).toContain('data-[selected]:data-[position=last]:rounded-b-extra-small');
    expect(s.item()).toContain('data-[selected]:data-[position=middle]:rounded-none');
    expect(s.item()).toContain('data-[selected]:not([data-position]):rounded-extra-small');
    expect(s.itemIndicator()).toContain('text-on-surface');
    expect(s.itemIndicator()).not.toContain('text-primary');
    expect(s.itemIndicator()).toContain('group-data-[selected]:text-on-secondary-container');
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

  test('item label uses label-large to match Menu list items', () => {
    expect(s.item()).toContain('text-label-large');
    expect(s.item()).not.toContain('text-body-large');
  });

  test('disabled item is per-token (no blanket opacity): label + trailing on-surface/0.38, no state layer', () => {
    expect(s.item()).toContain('data-[disabled]:text-on-surface/[0.38]');
    expect(s.item()).toContain('data-[disabled]:before:opacity-0');
    expect(s.item()).toContain(
      'data-[disabled]:[&_[data-slot=select-trailing]]:text-on-surface/[0.38]',
    );
    expect(s.item()).not.toContain('data-[disabled]:opacity-[0.38]');
    expect(s.item()).toContain('data-[disabled]:pointer-events-none');
    // the trigger's trailing icon also dims per-token
    expect(s.icon()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
    // the selected-check indicator dims with its disabled row (own text color)
    expect(s.itemIndicator()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
  });
});

describe('Select parts', () => {
  test('namespace exposes the scroll arrow parts', () => {
    expect(Select.ScrollUpArrow).toBeDefined();
    expect(Select.ScrollDownArrow).toBeDefined();
  });
});
