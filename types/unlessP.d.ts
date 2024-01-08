export default function unlessP<T, U>(
  pred: (x: T) => Promise<boolean> | boolean,
  f: (x: T) => Promise<U> | U,
  x: T,
): Promise<T | U>

export default function unlessP<T, U>(
  pred: (x: T) => Promise<boolean> | boolean,
  f: (x: T) => Promise<U> | U,
): {
  (x: T): Promise<T | U>
}

export default function unlessP<T>(pred: (x: T) => Promise<boolean> | boolean): {
  <U>(f: (x: T) => Promise<U> | U, x: T): Promise<T | U>

  <U>(f: (x: T) => Promise<U> | U): {
    (x: T): Promise<T | U>
  }
}
