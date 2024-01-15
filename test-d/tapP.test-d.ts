import { expectType } from 'tsd'
import { Add } from 'ts-arithmetic'

import { tapP } from '..'

declare function add(x: 2, y: 2): Promise<Add<2, 2>>
declare function func(x: 4): Promise<'tapped value'>

expectType<Promise<4>>(add(2, 2).then(tapP(func)))
