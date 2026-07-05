import type { ReactNode } from 'react';

const cn = (...c: Array<string | false | undefined>): string =>
  c.filter(Boolean).join(' ');

interface PreviewFrameProps {
  children: ReactNode;
  className?: string;
}

/** Non-interactive preview area for component index cards (M3-style hero surface). */
export function PreviewFrame({ children, className }: PreviewFrameProps) {
  return (
    <div
      className={cn('doc-card__preview', className)}
      aria-hidden="true"
      inert
    >
      <div className="doc-card__preview-inner">{children}</div>
    </div>
  );
}
