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

  test('renders a leading icon slot when icon prop is provided', () => {
    render(
      <Chip variant="assist" icon={<svg data-testid="leading-icon" />}>
        With icon
      </Chip>,
    );
    const chip = screen.getByRole('button', { name: 'With icon' });
    const icon = chip.querySelector('[data-slot="icon"]');
    expect(icon).not.toBeNull();
    expect(icon?.querySelector('[data-testid="leading-icon"]')).not.toBeNull();
  });

  test('assist chip leading icon uses primary (not label on-surface)', () => {
    render(
      <Chip variant="assist" icon={<svg />}>
        Assist
      </Chip>,
    );
    const icon = screen
      .getByRole('button', { name: 'Assist' })
      .querySelector('[data-slot="icon"]') as HTMLElement;
    expect(icon.className).toContain('text-primary');
  });

  test('suggestion chip leading icon uses on-surface-variant', () => {
    render(
      <Chip variant="suggestion" icon={<svg />}>
        Suggestion
      </Chip>,
    );
    const icon = screen
      .getByRole('button', { name: 'Suggestion' })
      .querySelector('[data-slot="icon"]') as HTMLElement;
    expect(icon.className).toContain('text-on-surface-variant');
  });

  test('disabled assist chip leading icon uses on-surface/38', () => {
    render(
      <Chip variant="assist" disabled icon={<svg />}>
        Assist
      </Chip>,
    );
    const icon = screen
      .getByRole('button', { name: 'Assist' })
      .querySelector('[data-slot="icon"]') as HTMLElement;
    expect(icon.className).toContain('group-disabled:text-on-surface/38');
  });

  test('icon takes precedence over avatar when both are provided', () => {
    render(
      <Chip
        variant="assist"
        icon={<svg data-testid="leading-icon" />}
        avatar={<img alt="" src="a.png" />}
      >
        Both
      </Chip>,
    );
    const chip = screen.getByRole('button', { name: 'Both' });
    expect(chip.querySelector('[data-slot="icon"]')).not.toBeNull();
    expect(chip.querySelector('[data-slot="avatar"]')).toBeNull();
  });

  test('filter chip hides leading icon when selected', () => {
    render(
      <Chip variant="filter" selected icon={<svg data-testid="leading-icon" />}>
        Filter
      </Chip>,
    );
    const icon = screen
      .getByRole('button', { name: 'Filter' })
      .querySelector('[data-slot="icon"]') as HTMLElement;
    expect(icon.className.split(' ')).toContain('group-data-[pressed]:hidden');
  });

  test('interactive chips expose a transparent 48dp touch target (M3 a11y)', () => {
    render(<Chip variant="assist">Assist</Chip>);
    const chip = screen.getByRole('button', { name: 'Assist' });
    const tt = chip.querySelector('[data-touch-target]');
    expect(tt).not.toBeNull();
    expect(tt).toHaveAttribute('aria-hidden', 'true');
    expect((tt as HTMLElement).style.position).toBe('absolute');
    // Assert each dimension so a regression in only one is still caught.
    expect((tt as HTMLElement).style.minWidth).toBe('48px');
    expect((tt as HTMLElement).style.minHeight).toBe('48px');
    // The root must not clip overflow, or the 48dp extension is cut off.
    expect(chip.className).not.toContain('overflow-hidden');
  });
});
