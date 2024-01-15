import { expectType } from 'tsd'
import { Add, Multiply } from 'ts-arithmetic'

import { useWithP } from '..'

declare function addToOne(x: 3): Promise<Add<1, 3>>
declare function addToTwo(x: 4): Promise<Add<2, 4>>
declare function mult(x: 4, y: 6): Promise<Multiply<4, 6>>

expectType<Promise<24>>(useWithP(mult, [ addToOne, addToTwo ])(3, 4))
expectType<Promise<24>>(useWithP(mult)([ addToOne, addToTwo ])(3)(4))
