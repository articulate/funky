import { expectAssignable } from 'tsd'
import { Add, Multiply } from 'ts-arithmetic'

import { evolveP } from '..'

type Expectation = Promise<{ foo: 3, bar: { baz: 3 }, bat: 1 }>

declare function add(x: 2): {
  (y: 1): Promise<Add<1, 2>>
}

declare function mult(x: 3): {
  (y: 1): Promise<Multiply<3, 1>>
}

const arg1 = { foo: add(2), bar: { baz: mult(3) } }
const arg2 = { foo: 1 as const, bar: { baz: 1 as const }, bat: 1 as const }

expectAssignable<Expectation>(evolveP(arg1, arg2))
expectAssignable<Expectation>(evolveP(arg1)(arg2))
