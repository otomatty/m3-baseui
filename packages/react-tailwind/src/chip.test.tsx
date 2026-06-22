import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Chip, chipTv } from './chip';

describe('Chip', () => {
  test('uncontrolled filter chip toggles Base UI data-pressed on click', () => {
    render(<Chip variant="filter">Filter</Chip>);
    const chip = screen.getByRole('button', { name: 'Filter' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    expect(chip).not.toHaveAttribute('data-pressed');

    fireEvent.click(chip);

    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(chip).toHaveAttribute('data-pressed');
  });

  test('filter chip keys its selected fill off data-pressed (not the selected prop)', () => {
    render(<Chip variant="filter">Filter</Chip>);
    // The fill must be wired to data-pressed so the uncontrolled toggle paints.
    expect(screen.getByRole('button', { name: 'Filter' }).className).toContain(
      'data-[pressed]:bg-secondary-container',
    );
  });

  test('disabled native button chip uses M3 tokens via :disabled (not blanket opacity)', () => {
    render(
      <Chip variant="assist" disabled>
        Assist
      </Chip>,
    );
    const chip = screen.getByRole('button', { name: 'Assist' });
    expect(chip).toBeDisabled();
    // M3 (material-web): disabled label = on-surface/38, outline = on-surface/12.
    // Native <button> exposes `disabled`, not Base UI's data-disabled, so the
    // styles must also target :disabled.
    expect(chip.className).toContain('disabled:text-on-surface/38');
    expect(chip.className).toContain('disabled:border-on-surface/12');
    expect(chip.className).not.toContain('disabled:opacity-[0.38]');
  });

  test('filter chip renders a leading checkmark that reveals on selection (M3)', () => {
    render(<Chip variant="filter">F</Chip>);
    const chip = screen.getByRole('button', { name: 'F' });
    // The checkmark stays in the DOM (data-slot hook) and is revealed via
    // data-pressed in CSS.
    const check = chip.querySelector('[data-slot="check"]');
    expect(check).not.toBeNull();
    expect((check as HTMLElement).className.split(' ')).toContain(
      'group-data-[pressed]:opacity-100',
    );
  });

  test('assist chips have no leading checkmark', () => {
    render(<Chip variant="assist">A</Chip>);
    expect(
      screen.getByRole('button', { name: 'A' }).querySelector('[data-slot="check"]'),
    ).toBeNull();
  });

  test('disabled selected filter chip uses on-surface/12 container (M3)', () => {
    expect(chipTv({ variant: 'filter' }).root()).toContain(
      'data-[pressed]:data-[disabled]:bg-on-surface/12',
    );
  });

  test('elevated chip uses surface-container-low + level1→level2 elevation (M3)', () => {
    const root = chipTv({ variant: 'assist', elevated: true }).root();
    expect(root).toContain('bg-surface-container-low');
    expect(root).toContain('shadow-level1');
    expect(root).toContain('hover:shadow-level2');
    // elevated chips drop the outline
    expect(root).toContain('border-transparent');
  });

  test('renders a leading avatar slot when provided', () => {
    render(
      <Chip variant="assist" avatar={<img alt="" src="a.png" />}>
        With avatar
      </Chip>,
    );
    const chip = screen.getByRole('button', { name: 'With avatar' });
    const avatar = chip.querySelector('[data-slot="avatar"]');
    expect(avatar).not.toBeNull();
    expect(avatar?.querySelector('img')).not.toBeNull();
  });
});
