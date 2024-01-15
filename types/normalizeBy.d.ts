export default function normalizeBy<
  K extends PropertyKey,
  T extends Record<K, any>,
>(key: K, list: T[]): Record<T[K], T>

export default function normalizeBy<
  K extends PropertyKey,
>(key: K): {
  <T extends Record<K, any>>(list: T[]): Record<T[K], T>
}
