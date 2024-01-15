export default function combineWithP<A, B, C, D>(
  mf: (c: C, b: B) => Promise<D> | D,
  f: (a: A) => Promise<B> | B,
  x: C,
): Promise<D>

export default function combineWithP<A, B, C, D>(
  mf: (c: C, b: B) => Promise<D> | D,
  f: (a: A) => Promise<B> | B,
): {
  (x: C): Promise<D>
}

export default function combineWithP<B, C, D>(mf: (c: C, b: B) => Promise<D> | D): {
  <A>(f: (a: A) => Promise<B> | B, x: C): Promise<D>
  <A>(f: (a: A) => Promise<B> | B): {
    (x: C): Promise<D>
  }
}
