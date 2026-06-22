/**
 * Registers happy-dom's globals (document, window, …) BEFORE any module that
 * touches the DOM is imported. This file is the first `preload` entry in
 * bunfig.toml; keeping the registration isolated guarantees it runs before
 * @testing-library/react (imported in test/setup.ts and the test files) reads
 * the global `document`.
 */
import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();
