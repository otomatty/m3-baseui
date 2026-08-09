import type { ReactNode } from 'react';

interface DemoProviderProps {
  children: ReactNode;
}

/**
 * Doc live demos inherit site theme written onto <html> by DocsNav
 * (`syncDocumentTheme`). ThemeProvider is optional — tokens on <html> suffice.
 */
export function DemoProvider({ children }: DemoProviderProps) {
  return <div className="m3-demo">{children}</div>;
}
