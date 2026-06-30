/**
 * dialog.contract.ts — slot classes + props for the M3 Dialog.
 *
 * Covers both M3 dialog shapes: the centered **basic** dialog and the
 * edge-to-edge **fullscreen** variant. The `popup` class is resolved per
 * variant (`fullscreen`), and the optional `icon` slot centers the
 * headline/supporting text (handled in the engine class strings via
 * `:has([data-slot="dialog-icon"])`). `header`, `divider` and `actions` are the
 * fullscreen header row, its separator, and the end-aligned button row. Both
 * engines emit the same DOM + `data-*` (`data-fullscreen`), so they stay
 * drop-in compatible.
 */
export interface DialogPopupResolverArgs {
  /** Edge-to-edge fullscreen surface instead of the centered basic dialog. */
  fullscreen: boolean;
}

export interface DialogClasses {
  backdrop: string;
  /** Surface; centered basic dialog vs. edge-to-edge fullscreen variant. */
  popup: (args: DialogPopupResolverArgs) => string;
  /** Fullscreen header row: leading close icon + title + trailing action. */
  header: string;
  /** Optional hero icon (24dp, horizontally centered, `secondary`). */
  icon: string;
  title: string;
  description: string;
  /** 1dp `outline-variant` rule under the fullscreen header. */
  divider: string;
  /** End-aligned action row (8dp between buttons, 24dp above). */
  actions: string;
  close: string;
}

export interface DialogPopupOwnProps {
  /** Render the edge-to-edge fullscreen variant. @default false */
  fullscreen?: boolean;
}
