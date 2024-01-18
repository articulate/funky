export default function onSuccess<T, U>(
  afterThis: (arg: T) => U,
  that: (arg: T) => unknown,
  data: T,
): U

export default function onSuccess<T, U>(
  afterThis: (arg: T) => U,
  that: (arg: T) => unknown,
): {
  (data: T): U
}

export default function onSuccess<T, U>(afterThis: (arg: T) => U): {
  (that: (arg: T) => unknown, data: T): U
  (that: (arg: T) => unknown): {
    (data: T): U
  }
}
