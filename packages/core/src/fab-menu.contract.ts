/**
 * fab-menu.contract.ts — slot classes for the M3 FAB menu.
 *
 * A FAB menu opens from a FAB to reveal a column of related actions. It reuses
 * the FAB size/color sets: the Trigger *is* a FAB, and each item is a
 * pill-shaped action whose container color resolves per `FabColor`. The class
 * resolvers turn that state into one class string per engine; the DOM + data-*
 * stay identical so the two builds are drop-in compatible.
 */
import type { FabColor } from './fab.contract';

export interface FabMenuClasses {
  /** Column container that stacks the action items beside the FAB. */
  popup: string;
  /** A single FAB menu item, resolved per container color. */
  item: (color: FabColor) => string;
}
