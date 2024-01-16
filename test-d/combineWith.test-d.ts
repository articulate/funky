import { Add, Multiply } from 'ts-arithmetic'
import { expectType } from 'tsd'

import { combineWith } from '..'

declare function add(a: 2): {
  (b: 3): Add<2, 3>
}

declare function multiply(a: 3, b: 5): Multiply<3, 5>

expectType<15>(combineWith(multiply, add(2), 3))
expectType<15>(combineWith(multiply)(add(2))(3))
expectType<15>(combineWith(multiply, add(2))(3))
expectType<15>(combineWith(multiply)(add(2), 3))
