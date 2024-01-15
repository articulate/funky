import { expectType } from 'tsd'

import { onSuccessP } from '..'

declare function afterThis(a: 'a'): 'b'
declare function afterThisP(a: 'a'): Promise<'b'>
declare function that(a: 'a'): 'c'
declare function thatP(a: 'a'): Promise<'c'>

expectType<Promise<'b'>>(onSuccessP(afterThis, that, 'a'))
expectType<Promise<'b'>>(onSuccessP(afterThis, that)('a'))
expectType<Promise<'b'>>(onSuccessP(afterThis)(that, 'a'))
expectType<Promise<'b'>>(onSuccessP(afterThis)(that)('a'))

expectType<Promise<'b'>>(onSuccessP(afterThisP, that, 'a'))
expectType<Promise<'b'>>(onSuccessP(afterThisP, that)('a'))
expectType<Promise<'b'>>(onSuccessP(afterThisP)(that, 'a'))
expectType<Promise<'b'>>(onSuccessP(afterThisP)(that)('a'))

expectType<Promise<'b'>>(onSuccessP(afterThis, thatP, 'a'))
expectType<Promise<'b'>>(onSuccessP(afterThis, thatP)('a'))
expectType<Promise<'b'>>(onSuccessP(afterThis)(thatP, 'a'))
expectType<Promise<'b'>>(onSuccessP(afterThis)(thatP)('a'))
