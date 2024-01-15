import { expectAssignable } from 'tsd'
import { Add, Multiply } from 'ts-arithmetic'

import { juxtP } from '..'

declare function add (x: 1, y: 2): Promise<Add<1, 2>>
declare function mult (x: 1, y: 2): Promise<Multiply<1, 2>>

type Expectation = Promise<[ 3, 2 ]>

const branches = juxtP([ add, mult ])

expectAssignable<Expectation>(branches(1, 2))
