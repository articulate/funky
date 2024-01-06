import { expectType } from 'tsd'

import { mapP } from '..'

declare function add(x: number): {
  (y: number): Promise<number>
}

expectType<Promise<number[]>>(mapP(add(1), [ 1, 2, 3, 4 ]))

expectType<Promise<{ foo: number, bar: number, baz: number }>>(mapP(add(1), {
  foo: 1,
  bar: 2,
  baz: 3,
}))
