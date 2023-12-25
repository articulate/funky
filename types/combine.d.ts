type Combined<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>,
> = T & Omit<U, keyof T>

export default function combine<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>,
>(f: (a: T) => U, x: T): Combined<T, U>

export default function combine<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>,
>(f: (a: T) => U): {
  (x: T): Combined<T, U>
}
