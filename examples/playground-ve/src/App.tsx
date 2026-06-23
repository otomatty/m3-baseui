/**
 * Re-export the shared playground demo. The Vite alias in this app's
 * vite.config.ts rewrites the App's '@m3/react-tailwind' imports to
 * '@m3/react-vanilla-extract', so the exact same demo renders with the
 * vanilla-extract build of every component.
 */
export { App } from '../../playground/src/App';
