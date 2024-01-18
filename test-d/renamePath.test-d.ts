import { expectAssignable } from 'tsd'

import { renamePath } from '..'


const orig = { a: { b: 'b' as const }, c: 'c' as const }
type Expecation = { a: { B: 'b' }, c: 'c' }

expectAssignable<Expecation>(renamePath([ 'a', 'b' ], 'B', orig))
expectAssignable<Expecation>(renamePath([ 'a', 'b' ], 'B')(orig))
expectAssignable<Expecation>(renamePath([ 'a', 'b' ])('B', orig))
expectAssignable<Expecation>(renamePath([ 'a', 'b' ])('B')(orig))
