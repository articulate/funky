import { expectType } from 'tsd'
import { lensProp } from 'ramda'

import { overP } from '..'

declare function add (x: number): {
  (y: number): Promise<number>
}

expectType<Promise<{ foo: number, bar: number }>>(
  overP(lensProp('foo'), add(1), { foo: 47, bar: 2 }),
)
