'use client';
/**
 * Ripple — pointer-origin expanding overlay. Base UI does not ship a ripple, so
 * M3's touch ripple lives here in core and is composed into components that
 * need it. Honors `prefers-reduced-motion`.
 *
 * Usage: render <Ripple /> as the last child inside a `position: relative`
 * element. It listens for pointerdown on its parent element.
 */
import * as React from 'react';

interface RippleInstance {
  key: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleProps {
  /** Ripple tint. Defaults to currentColor. */
  color?: string;
  /** Animation duration in ms. @default 450 */
  duration?: number;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function Ripple({ color = 'currentColor', duration = 450 }: RippleProps): React.JSX.Element {
  const hostRef = React.useRef<HTMLSpanElement | null>(null);
  const [ripples, setRipples] = React.useState<RippleInstance[]>([]);
  const seq = React.useRef(0);

  React.useEffect(() => {
    const host = hostRef.current;
    const parent = host?.parentElement;
    if (!host || !parent) return;

    function spawn(event: PointerEvent): void {
      if (prefersReducedMotion()) return;
      const rect = parent!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Diameter that reaches the farthest corner from the press point.
      const dx = Math.max(x, rect.width - x);
      const dy = Math.max(y, rect.height - y);
      const size = 2 * Math.hypot(dx, dy);
      const key = seq.current++;
      setRipples((prev) => [...prev, { key, x, y, size }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.key !== key));
      }, duration);
    }

    parent.addEventListener('pointerdown', spawn);
    return () => parent.removeEventListener('pointerdown', spawn);
  }, [duration]);

  return (
    <span
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 'inherit',
        pointerEvents: 'none',
      }}
    >
      {ripples.map((r) => (
        <span
          key={r.key}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            marginLeft: -r.size / 2,
            marginTop: -r.size / 2,
            borderRadius: '50%',
            background: color,
            opacity: 0.12,
            transform: 'scale(0)',
            animation: `m3-ripple ${duration}ms linear`,
          }}
        />
      ))}
      <style>{`
        @keyframes m3-ripple {
          from { transform: scale(0); opacity: 0.24; }
          to   { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </span>
  );
}
