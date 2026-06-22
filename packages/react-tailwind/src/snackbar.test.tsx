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
});
