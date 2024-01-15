import { expectType } from 'tsd'
import { Add } from 'ts-arithmetic'

import { whenP } from '..'

declare function even<T extends number>(a: T): Promise<boolean>

declare function add<T extends number>(x: T): {
  <U extends number>(y: U): Promise<Add<T, U>>
}

expectType<Promise<1 | 3>>(whenP(even, add(2), 1))
