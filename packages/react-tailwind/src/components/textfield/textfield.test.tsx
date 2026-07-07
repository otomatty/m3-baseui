import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { TextField, textFieldTv } from '../textfield/textfield';

describe('TextField', () => {
  test('associates the floating label with the input', () => {
    render(<TextField label="名前" />);
    // The Field.Label is wired to the control via htmlFor/id.
    expect(screen.getByLabelText('名前')).toHaveProperty('tagName', 'INPUT');
  });

  test('error drives Base UI Field invalid state across root and control', () => {
    const { container } = render(<TextField label="メール" error supportingText="必須です" />);
    const input = screen.getByLabelText('メール');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    // invalid must propagate through Field (not just the root DOM node) so the
    // control — which consumers can style via inputClassName — is also flagged.
    expect(input).toHaveAttribute('data-invalid');
    // The error color keys off data-invalid on the Field.Root (the group) too.
    expect(container.querySelector('[data-invalid]')).not.toBeNull();
  });

  test('counter reflects the current length and updates on input', () => {
    render(<TextField label="バイオ" showCounter maxLength={10} defaultValue="ab" />);
    expect(screen.getByText('2/10')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('バイオ'), { target: { value: 'abcd' } });
    expect(screen.getByText('4/10')).toBeInTheDocument();
  });

  test('counter stays in sync with a controlled value (no input event)', () => {
    const { rerender } = render(
      <TextField label="バイオ" showCounter maxLength={10} value="ab" onChange={() => {}} />,
    );
    expect(screen.getByText('2/10')).toBeInTheDocument();
    // External value change (e.g. form reset / prefill) must update the counter.
    rerender(
      <TextField label="バイオ" showCounter maxLength={10} value="abcde" onChange={() => {}} />,
    );
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  test('multiline renders a native textarea wired to the floating label', () => {
    render(<TextField multiline label="説明" rows={4} />);
    const control = screen.getByLabelText('説明');
    // M3 textarea = multi-line <textarea>, still associated with the label.
    expect(control).toHaveProperty('tagName', 'TEXTAREA');
    expect(control).toHaveAttribute('rows', '4');
  });

  test('multiline still forwards value/counter behaviour', () => {
    render(<TextField multiline label="説明" showCounter maxLength={20} defaultValue="ab" />);
    expect(screen.getByText('2/20')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('説明'), { target: { value: 'abcd' } });
    expect(screen.getByText('4/20')).toBeInTheDocument();
  });

  test('multiline props are typed as a <textarea> (wrap/cols pass through)', () => {
    // The discriminated union exposes textarea-only props on the multiline path;
    // this would not type-check on the single-line (<input>) branch.
    render(<TextField multiline label="説明" wrap="soft" cols={30} />);
    const control = screen.getByLabelText('説明');
    expect(control).toHaveAttribute('wrap', 'soft');
    expect(control).toHaveAttribute('cols', '30');
  });

  test('multiline onChange receives a textarea change event', () => {
    let target: EventTarget | null = null;
    render(
      <TextField
        multiline
        label="説明"
        onChange={(e) => {
          // e is typed ChangeEvent<HTMLTextAreaElement> on the multiline branch.
          target = e.target;
        }}
      />,
    );
    fireEvent.change(screen.getByLabelText('説明'), { target: { value: 'x' } });
    expect((target as unknown as HTMLElement)?.tagName).toBe('TEXTAREA');
  });

  test('single-line default stays an <input>', () => {
    render(<TextField label="名前" />);
    expect(screen.getByLabelText('名前')).toHaveProperty('tagName', 'INPUT');
  });
});

describe('TextField tokens', () => {
  test('filled resting active indicator is M3 1dp on-surface-variant', () => {
    const field = textFieldTv({ variant: 'filled' }).field();
    expect(field).toContain('border-b border-on-surface-variant');
    expect(field).not.toContain('border-b-2');
    expect(field).not.toContain('border-outline');
  });

  test('filled active indicator grows to the M3 3dp focus height', () => {
    const field = textFieldTv({ variant: 'filled' }).field();
    // Resting indicator stays on the bottom border; focus = primary at 3dp
    // (M3 filled-text-field focus-active-indicator-height: 3px).
    expect(field).toContain('group-data-[focused]:border-b-[3px]');
    expect(field).toContain('group-data-[focused]:border-primary');
  });

  test('filled container exposes the M3 hover state layer and indicator color', () => {
    const field = textFieldTv({ variant: 'filled' }).field();
    expect(field).toContain('hover:before:opacity-[var(--md-sys-state-hover)]');
    expect(field).toContain('hover:border-on-surface');
    expect(field).toContain('group-data-[disabled]:before:opacity-0');
  });

  test('outlined focus outline is the M3 3dp width, not 2dp', () => {
    const field = textFieldTv({ variant: 'outlined' }).field();
    // M3 outlined-text-field focus-outline-width: 3px (matches Select's trigger);
    // padding compensates the extra 2px so content stays steady.
    expect(field).toContain('group-data-[focused]:border-[3px]');
    expect(field).toContain('group-data-[focused]:px-[14px]');
    expect(field).not.toContain('group-data-[focused]:border-2');
    expect(field).not.toContain('group-data-[focused]:px-[15px]');
  });

  test('outlined hover changes outline color only (no container state layer)', () => {
    const field = textFieldTv({ variant: 'outlined' }).field();
    expect(field).toContain('hover:border-on-surface');
    expect(field).not.toContain('hover:before:opacity-[var(--md-sys-state-hover)]');
    expect(field).not.toContain('before:absolute');
    expect(field).toContain('overflow-visible');
    expect(field).not.toContain('overflow-hidden');
  });

  test('outlined floated label stays above the border notch (not clipped)', () => {
    const label = textFieldTv({ variant: 'outlined' }).label();
    expect(label).toContain('group-data-[focused]:z-[1]');
    // The notch mask is background-independent: defaults to surface, but a field
    // on another background can override --md-textfield-notch.
    expect(label).toContain(
      'group-data-[focused]:bg-[var(--md-textfield-notch,var(--color-surface))]',
    );
    expect(label).toContain('group-data-[focused]:leading-none');
  });

  test('filled field keeps overflow hidden for the hover state layer', () => {
    const field = textFieldTv({ variant: 'filled' }).field();
    expect(field).toContain('overflow-hidden');
  });

  test('icon spacing follows M3 tokens: 16dp icon-to-input, 12dp icon-side edge', () => {
    const field = textFieldTv({ variant: 'filled' }).field();
    // md.comp.*-text-field icon-input-space = 16px (gap between icon and input).
    expect(field).toContain('gap-4');
    // with-leading-icon / with-trailing-icon leading/trailing space = 12px.
    expect(field).toContain('has-[[data-slot^=leading-icon]]:pl-3');
    expect(field).toContain('has-[[data-slot^=trailing-icon]]:pr-3');
    // Baseline (no icon) leading/trailing space stays 16px.
    expect(field).toContain('px-4');
  });

  test('outlined focus keeps icon-side padding steady (compensates the 3dp border)', () => {
    const field = textFieldTv({ variant: 'outlined' }).field();
    // Resting icon sides = 12px; on focus the border grows +2px so those sides
    // drop to 10px (higher specificity than px-[14px]) to avoid an inward shift.
    expect(field).toContain('group-data-[focused]:has-[[data-slot^=leading-icon]]:pl-[10px]');
    expect(field).toContain('group-data-[focused]:has-[[data-slot^=trailing-icon]]:pr-[10px]');
  });

  test('multiline field grows from a min height and top-aligns content', () => {
    const c = textFieldTv({ variant: 'outlined', multiline: true });
    // Fixed 56dp height only applies to single-line; multiline uses a min-height
    // so the textarea can grow, and content/label anchor to the top.
    expect(c.field()).toContain('min-h-14');
    // No fixed `h-14` token (min-h-14 is fine — check exact tokens, not substrings).
    expect(c.field().split(' ')).not.toContain('h-14');
    expect(c.field()).toContain('items-start');
    // The textarea itself is user-resizable vertically (M3 `resize: vertical`).
    expect(c.input()).toContain('resize-y');
  });

  test('single-line keeps the fixed 56dp height', () => {
    const field = textFieldTv({ variant: 'filled', multiline: false }).field();
    expect(field).toContain('h-14');
    expect(field).not.toContain('min-h-14');
  });

  test('interactive trailing icon exposes a 48dp touch target', () => {
    render(
      <TextField
        label="検索"
        trailingIcon={<span data-testid="icon" />}
        trailingIconAction={{ 'aria-label': 'クリア', onClick: () => {} }}
      />,
    );
    const button = screen.getByRole('button', { name: 'クリア' });
    expect(button).toHaveAttribute('data-slot', 'trailing-icon-button');
    expect(button.querySelector('[data-touch-target]')).not.toBeNull();
    expect(textFieldTv().trailingIconButton()).toContain('size-12');
  });
});
