/**
 * Augments Bun's `expect` matchers with @testing-library/jest-dom matchers
 * (registered at runtime in `test/setup.ts` via `expect.extend`). Lives in this
 * package's `src` so its `tsc --noEmit` program picks it up; replicate this file
 * in any other package that gains jest-dom-based tests.
 */
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'bun:test' {
  interface Matchers<T = unknown> extends TestingLibraryMatchers<unknown, T> {}
}
