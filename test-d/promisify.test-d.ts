import { expectType } from 'tsd'
import { Add } from 'ts-arithmetic'

import { promisify } from '..'

type AddCallback = (err: unknown, val?: Add<1, 2>) => unknown

declare function add(
  a: 1,
  b: 2,
  done: AddCallback,
): void

declare class Counter {
  constructor(start: 1)
  add(val: 2, cb: AddCallback): void
}

expectType<Promise<3>>(promisify(add)(1, 2))

const counter = new Counter(1)
expectType<Promise<3>>(promisify(counter.add, counter)(2))
