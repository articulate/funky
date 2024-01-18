import { expectType } from 'tsd'

import { reject } from '..'

expectType<Promise<never>>(reject(new Error('bad')))
expectType<Promise<never>>(reject('bad'))
