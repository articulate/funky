export default function combineWith<A, B, C, D>(
  mf: (c: C, b: B) => D,
  f: (a: A) => B,
): {
  (x: C): D
}

export default function combineWith<B, C, D>(mf: (c: C, b: B) => D): {
  <A>(f: (a: A) => B): {
    (x: C): D
  }
}
