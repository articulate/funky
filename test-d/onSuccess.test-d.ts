import { expectType } from 'tsd'

import { onSuccess } from '..'

declare function afterThis(a: 'a'): 'b'
declare function that(a: 'a'): 'c'

expectType<'b'>(onSuccess(afterThis, that, 'a'))
expectType<'b'>(onSuccess(afterThis, that)('a'))
expectType<'b'>(onSuccess(afterThis)(that, 'a'))
expectType<'b'>(onSuccess(afterThis)(that)('a'))
