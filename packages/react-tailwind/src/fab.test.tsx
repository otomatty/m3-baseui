import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Fab } from './fab';

describe('Fab', () => {
  test('renders a button with the size + color classes', () => {
    render(
      <Fab size="large" color="primary" aria-label="作成">
        <svg viewBox="0 0 24 24" />
      </Fab>,
    );
    const fab = screen.getByRole('button', { name: '作成' });
    expect(fab.className).toContain('size-24');
    expect(fab.className).toContain('bg-primary-container');
  });

  test('extended FAB shows its label', () => {
    render(
      <Fab size="extended">
        <svg viewBox="0 0 24 24" /> 作成
      </Fab>,
    );
    expect(screen.getByRole('button', { name: /作成/ })).toBeInTheDocument();
  });
});
