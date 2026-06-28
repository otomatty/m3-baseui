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

  test('uses M3 elevation level3 at rest and level4 on hover', () => {
    render(
      <Fab aria-label="Add">
        <svg viewBox="0 0 24 24" />
      </Fab>,
    );
    const fab = screen.getByRole('button', { name: 'Add' });
    expect(fab.className).toContain('shadow-level3');
    expect(fab.className).toContain('hover:shadow-level4');
  });

  test('disabled uses M3 container/label tokens, not a blanket opacity', () => {
    render(
      <Fab disabled aria-label="Off">
        <svg viewBox="0 0 24 24" />
      </Fab>,
    );
    const fab = screen.getByRole('button', { name: 'Off' });
    expect(fab).toBeDisabled();
    // M3 discourages disabled FABs; when native disabled is used, match button tokens.
    expect(fab.className).toContain('disabled:bg-on-surface/12');
    expect(fab.className).toContain('disabled:text-on-surface/38');
    expect(fab.className).toContain('disabled:shadow-none');
    expect(fab.className).toContain('disabled:before:opacity-0');
    expect(fab.className).toContain('data-[disabled]:bg-on-surface/12');
    expect(fab.className).toContain('data-[disabled]:text-on-surface/38');
    expect(fab.className).toContain('data-[disabled]:shadow-none');
    expect(fab.className).toContain('data-[disabled]:before:opacity-0');
    expect(fab.className).not.toContain('disabled:opacity-[0.38]');
  });
});
