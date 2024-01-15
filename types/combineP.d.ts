import type { Combined } from './lib/combine'

export default function combineP<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>,
>(f: (a: T) => Promise<U> | U, x: T): Promise<Combined<[ U, T ]>>

export default function combineP<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>,
>(f: (a: T) => Promise<U> | U): {
  (x: T): Promise<Combined<[ U, T ]>>
}
