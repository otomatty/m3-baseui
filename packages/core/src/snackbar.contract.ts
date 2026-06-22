/**
 * snackbar.contract.ts — slot classes for the M3 Snackbar.
 *
 * Built on Base UI `Toast`: a `Provider` holds the queue, a `Viewport` anchors
 * the stack, and each `Root` is one snackbar (inverse-surface container) with a
 * title/description, an optional action and an optional close. Use
 * `useSnackbar()` (re-export of `useToastManager`) to enqueue toasts. One class
 * per slot keeps both engines drop-in compatible.
 */
export interface SnackbarClasses {
  /** Toast.Viewport — fixed stack anchor. */
  viewport: string;
  /** Toast.Root — one snackbar surface. */
  root: string;
  /** Text column (title + description). */
  content: string;
  /** Toast.Title — single-line text. */
  title: string;
  /** Toast.Description — second line. */
  description: string;
  /** Toast.Action — trailing text button. */
  action: string;
  /** Toast.Close — trailing close affordance. */
  close: string;
}
