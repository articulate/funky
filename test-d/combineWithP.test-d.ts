import { Add, Multiply } from 'ts-arithmetic'
import { expectType } from 'tsd'

import { combineWithP } from '..'

declare function add(a: 2): {
  (b: 3): Promise<Add<2, 3>>
}

declare function multiply(a: 3, b: 5): Promise<Multiply<3, 5>>

expectType<Promise<15>>(combineWithP(multiply)(add(2))(3))
expectType<Promise<15>>(combineWithP(multiply, add(2))(3))
