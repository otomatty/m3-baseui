/** Shared helpers for token generators. */

/** camelCase / PascalCase → kebab-case. */
export function kebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/** The typescale sub-properties we emit, in order. */
export const TYPESCALE_PROPS = [
  ['fontFamily', 'font'],
  ['fontWeight', 'weight'],
  ['fontSize', 'size'],
  ['lineHeight', 'line-height'],
  ['letterSpacing', 'tracking'],
] as const;
