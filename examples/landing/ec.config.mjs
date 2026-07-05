import { defineEcConfig } from 'astro-expressive-code';

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
export default defineEcConfig({
  themes: ['github-light', 'github-dark'],
  // DocsNav が `data-theme="light" | "dark"` で切り替えるため、OS メディアクエリは使わない
  useDarkModeMediaQuery: false,
  customizeTheme(theme) {
    theme.name = theme.type === 'dark' ? 'dark' : 'light';
  },
  defaultLocale: 'ja-JP',
  styleOverrides: {
    borderRadius: '0.75rem',
    borderWidth: '1px',
    borderColor: 'rgb(var(--md-sys-color-outline-variant))',
    codeFontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
    uiFontFamily: 'inherit',
    frames: {
      shadowColor: 'transparent',
      frameBoxShadowCssValue: 'none',
      editorBackground: 'rgb(var(--md-sys-color-surface-container-highest))',
      terminalBackground: 'rgb(var(--md-sys-color-surface-container-highest))',
      editorTabBarBackground: 'rgb(var(--md-sys-color-surface-container-high))',
      terminalTitlebarBackground: 'rgb(var(--md-sys-color-surface-container-high))',
      editorActiveTabBackground: 'rgb(var(--md-sys-color-surface-container-highest))',
      editorActiveTabForeground: 'rgb(var(--md-sys-color-on-surface))',
      editorTabBarBorderBottomColor: 'rgb(var(--md-sys-color-outline-variant))',
      terminalTitlebarBorderBottomColor: 'rgb(var(--md-sys-color-outline-variant))',
      editorActiveTabBorderColor: 'rgb(var(--md-sys-color-outline-variant))',
      inlineButtonForeground: 'rgb(var(--md-sys-color-on-surface-variant))',
    },
  },
});
