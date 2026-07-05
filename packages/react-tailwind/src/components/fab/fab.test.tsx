import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Fab } from '../fab/fab';

describe('Fab', () => {
  test('defaults to a 56dp small primary FAB', () => {
    render(
      <Fab aria-label="追加">
        <svg viewBox="0 0 24 24" />
      </Fab>,
    );
    const fab = screen.getByRole('button', { name: '追加' });
    expect(fab.className).toContain('size-14'); // 56dp
    expect(fab.className).toContain('rounded-large'); // 16dp
    expect(fab.className).toContain('bg-primary-container');
  });

  test('M3 Expressive sizes map to 56 / 80 / 96 dp with growing corners + icons', () => {
    const { rerender } = render(
      <Fab size="small" aria-label="s">
        <svg />
      </Fab>,
    );
    let fab = screen.getByRole('button', { name: 's' });
    expect(fab.className).toContain('size-14');
    expect(fab.className).toContain('rounded-large');

    rerender(
      <Fab size="medium" aria-label="m">
        <svg />
      </Fab>,
    );
    fab = screen.getByRole('button', { name: 'm' });
    expect(fab.className).toContain('size-20'); // 80dp
    expect(fab.className).toContain('rounded-large-increased'); // 20dp

    rerender(
      <Fab size="large" aria-label="l">
        <svg />
      </Fab>,
    );
    fab = screen.getByRole('button', { name: 'l' });
    expect(fab.className).toContain('size-24'); // 96dp
    expect(fab.className).toContain('rounded-extra-large'); // 28dp
  });

  test('extended FAB is a label pill; typescale grows with size', () => {
    const { rerender } = render(
      <Fab variant="extended" size="small">
        <svg viewBox="0 0 24 24" /> 作成
      </Fab>,
    );
    let fab = screen.getByRole('button', { name: /作成/ });
    expect(fab.className).toContain('h-14'); // 56dp height
    expect(fab.className).toContain('text-title-medium');

    rerender(
      <Fab variant="extended" size="medium">
        <svg /> 作成
      </Fab>,
    );
    fab = screen.getByRole('button', { name: /作成/ });
    expect(fab.className).toContain('h-20'); // 80dp
    expect(fab.className).toContain('text-title-large');

    rerender(
      <Fab variant="extended" size="large">
        <svg /> 作成
      </Fab>,
    );
    fab = screen.getByRole('button', { name: /作成/ });
    expect(fab.className).toContain('h-24'); // 96dp
    expect(fab.className).toContain('text-headline-small');
  });

  test('container color maps to container / on-container tokens', () => {
    const { rerender } = render(
      <Fab color="secondary" aria-label="s">
        <svg />
      </Fab>,
    );
    expect(screen.getByRole('button', { name: 's' }).className).toContain('bg-secondary-container');
    rerender(
      <Fab color="tertiary" aria-label="t">
        <svg />
      </Fab>,
    );
    expect(screen.getByRole('button', { name: 't' }).className).toContain('bg-tertiary-container');
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
