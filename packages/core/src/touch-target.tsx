'use client';
/**
 * touch-target.tsx — transparent ≥48dp pointer/touch area (M3 a11y).
 *
 * Material Design 3 requires every interactive control to expose a touch target
 * of at least 48×48dp, even when its visual size is smaller (an 18dp checkbox,
 * a 32dp chip, …). Like `Ripple`, the geometry lives here in core so both engine
 * builds emit identical DOM — there is nothing engine-specific to theme.
 *
 * Render it as the last child of a `position: relative` interactive root. The
 * span overflows to `max(48px, 100%)` while staying centered, so it never shrinks
 * a control that is already ≥48dp and never alters layout (it is absolutely
 * positioned and fully transparent). It deliberately sets no `pointer-events`:
 * it inherits `auto` from an enabled root (extending the hit area) and `none`
 * from a disabled one (so the expanded area is inert too).
 *
 * Note: the root must NOT clip overflow, or the extension is cut off — clip the
 * state layer via a rounded `::before` instead of `overflow: hidden` on the root.
 */
import type * as React from 'react';

/** Renders the transparent ≥48dp overlay; see the module header for placement rules. */
export function TouchTarget(): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      data-touch-target=""
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        // Equivalent to max(48px, 100%): fill the root but never shrink below
        // 48dp. Uses plain values (no `max()`) so every engine/runtime keeps it.
        width: '100%',
        height: '100%',
        minWidth: '48px',
        minHeight: '48px',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
