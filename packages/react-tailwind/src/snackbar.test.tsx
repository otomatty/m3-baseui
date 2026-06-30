import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Snackbar, useSnackbar } from './snackbar';

function Opener() {
  const { add } = useSnackbar();
  return (
    <button type="button" onClick={() => add({ title: '保存しました' })}>
      開く
    </button>
  );
}

function List() {
  const { toasts } = useSnackbar();
  return (
    <>
      {toasts.map((toast) => (
        <Snackbar.Root key={toast.id} toast={toast}>
          <Snackbar.Content>
            <Snackbar.Title />
          </Snackbar.Content>
        </Snackbar.Root>
      ))}
    </>
  );
}

function Example() {
  return (
    <Snackbar.Provider>
      <Opener />
      <Snackbar.Viewport>
        <List />
      </Snackbar.Viewport>
    </Snackbar.Provider>
  );
}

describe('Snackbar', () => {
  test('renders nothing until a toast is enqueued', () => {
    render(<Example />);
    expect(screen.queryByText('保存しました')).toBeNull();
  });

  test('enqueues a toast via useSnackbar().add', () => {
    render(<Example />);
    fireEvent.click(screen.getByRole('button', { name: '開く' }));
    expect(screen.getByText('保存しました')).toBeInTheDocument();
  });

  test('supporting text (Description) uses body-medium at full opacity', () => {
    function DescOpener() {
      const { add } = useSnackbar();
      return (
        <button
          type="button"
          onClick={() => add({ title: 'タイトル', description: '詳細メッセージ' })}
        >
          開く
        </button>
      );
    }
    function DescList() {
      const { toasts } = useSnackbar();
      return (
        <>
          {toasts.map((toast) => (
            <Snackbar.Root key={toast.id} toast={toast}>
              <Snackbar.Content>
                <Snackbar.Title />
                <Snackbar.Description />
              </Snackbar.Content>
            </Snackbar.Root>
          ))}
        </>
      );
    }
    render(
      <Snackbar.Provider>
        <DescOpener />
        <Snackbar.Viewport>
          <DescList />
        </Snackbar.Viewport>
      </Snackbar.Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: '開く' }));
    const description = screen.getByText('詳細メッセージ');
    // M3 snackbar supporting text = body-medium, on-inverse-surface at full opacity.
    expect(description.className).toContain('text-body-medium');
    expect(description.className).not.toContain('opacity-90');
  });

  test('childless Action falls back to toast.actionProps.children', () => {
    function ActionOpener() {
      const { add } = useSnackbar();
      return (
        <button
          type="button"
          onClick={() => add({ title: 'アーカイブ', actionProps: { children: '元に戻す' } })}
        >
          開く
        </button>
      );
    }
    function ActionList() {
      const { toasts } = useSnackbar();
      return (
        <>
          {toasts.map((toast) => (
            <Snackbar.Root key={toast.id} toast={toast}>
              <Snackbar.Title />
              {/* No children: must render the label from actionProps. */}
              <Snackbar.Action />
            </Snackbar.Root>
          ))}
        </>
      );
    }
    render(
      <Snackbar.Provider>
        <ActionOpener />
        <Snackbar.Viewport>
          <ActionList />
        </Snackbar.Viewport>
      </Snackbar.Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: '開く' }));
    expect(screen.getByRole('button', { name: '元に戻す' })).toBeInTheDocument();
  });

  test('viewport is the polite live region (aria-live from Base UI Toast)', () => {
    // M3 snackbars announce politely. Base UI's Toast.Viewport carries the
    // live region (role="region" + aria-live="polite"); Toast.Root is a
    // role="dialog". There is no role="status" — the polite announcement is
    // guaranteed by the viewport's aria-live, asserted here so a Base UI
    // upgrade that drops it fails loudly.
    const { container } = render(<Example />);
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
  });

  test('viewport width: max 672dp + small-screen clamp, no fixed 560px', () => {
    const { container } = render(<Example />);
    const viewport = container.querySelector('[aria-live="polite"]');
    expect(viewport).not.toBeNull();
    const cls = (viewport as HTMLElement).className;
    expect(cls).toContain('max-w-[672px]');
    expect(cls).toContain('calc(100vw-32px)');
    expect(cls).not.toContain('560px');
  });

  test('root container width follows content within M3 min 344dp / max 672dp', () => {
    const { container } = render(<Example />);
    fireEvent.click(screen.getByRole('button', { name: '開く' }));
    const root = container.querySelector('[role="dialog"], [role="alertdialog"]');
    expect(root).not.toBeNull();
    const cls = (root as HTMLElement).className;
    expect(cls).toContain('min-w-[min(344px,100%)]');
    expect(cls).toContain('max-w-[672px]');
    expect(cls).toContain('w-fit');
  });
});
