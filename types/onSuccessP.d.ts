export default function onSuccessP<T, U>(
  afterThis: (arg: T) => Promise<U> | U,
  that: (arg: T) => unknown,
  data: T,
): Promise<U>

export default function onSuccessP<T, U>(
  afterThis: (arg: T) => Promise<U> | U,
  that: (arg: T) => unknown,
): {
  (data: T): Promise<U>
}

export default function onSuccessP<T, U>(afterThis: (arg: T) => Promise<U> | U): {
  (that: (arg: T) => unknown, data: T): Promise<U>
  (that: (arg: T) => unknown): {
    (data: T): Promise<U>
  }
}
