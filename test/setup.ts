/**
 * Test setup — runs after happy-dom is registered (see bunfig.toml preload order).
 * Adds jest-dom matchers to Bun's `expect` and unmounts React trees between tests.
 */
import { afterEach, expect } from 'bun:test';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
