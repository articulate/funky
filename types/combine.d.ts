import type { Combined } from './lib/combine'

export default function combine<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>,
>(f: (a: T) => U, x: T): Combined<[ U, T ]>

export default function combine<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>,
>(f: (a: T) => U): {
  (x: T): Combined<[ U, T ]>
}
