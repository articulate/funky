import { expectType } from 'tsd'
import { Add, Multiply } from 'ts-arithmetic'

import { convergeP } from '..'

declare function add<T extends 1 | 2>(x: T): {
  (y: 1): Promise<Add<T, 1>>
}

declare function mult(x: 2, y: 3): Promise<Multiply<2, 3>>

expectType<Promise<6>>(convergeP(mult, [ add(1), add(2) ])(1))
expectType<Promise<6>>(convergeP(mult)([ add(1), add(2) ])(1))
