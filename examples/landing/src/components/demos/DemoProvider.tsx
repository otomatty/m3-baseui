import type { ReactNode } from 'react';

interface DemoProviderProps {
  children: ReactNode;
}

/**
 * Doc live demos inherit the site theme (mode + dynamic color) written onto
 * <html> by DocsNav — so we intentionally do NOT wrap a ThemeProvider here
 * (that would pin the demo to a fixed seed/mode and ignore the theme toggle).
 * No component reads ThemeProvider context, so the tokens on <html> suffice.
 */
export function DemoProvider({ children }: DemoProviderProps) {
  return <div className="m3-demo">{children}</div>;
}
