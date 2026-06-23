import * as React from 'react';
import * as tailwind from '@otomatty/react-tailwind';
import * as vanillaExtract from '@otomatty/react-vanilla-extract';

/**
 * Dual-engine plumbing for the stories.
 *
 * Both engine packages export the *same* component names and emit identical
 * DOM + data-* attributes (drop-in compatibility). Stories therefore never
 * import a component directly; they pull it from {@link useM3}, which returns
 * whichever engine the "Engine" toolbar global currently selects. Flipping the
 * toolbar re-renders every story through the other engine — a live check that
 * the two builds stay interchangeable.
 */
export type EngineId = 'tailwind' | 'vanilla-extract';

/** The shared public surface — both engines satisfy it. */
export type M3 = typeof tailwind;

const ENGINES: Record<EngineId, M3> = {
  tailwind,
  // The VE build re-exports the same theme primitives, so the shapes match.
  'vanilla-extract': vanillaExtract as unknown as M3,
};

const EngineContext = React.createContext<M3>(tailwind);

export function EngineProvider({
  engine,
  children,
}: {
  engine: EngineId;
  children: React.ReactNode;
}): React.JSX.Element {
  return <EngineContext.Provider value={ENGINES[engine]}>{children}</EngineContext.Provider>;
}

/** Components from the engine selected in the toolbar. */
export function useM3(): M3 {
  return React.useContext(EngineContext);
}
