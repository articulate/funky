import { expectType } from 'tsd'

import { move } from '..'

expectType<number[]>(move(3, 1, [ 0, 1, 2, 3, 4 ]))
