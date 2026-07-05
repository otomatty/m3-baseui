import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    /** HTML inert attribute (React 18 types omit this; used for a11y tab-order gating). */
    inert?: boolean | '';
  }
}
