import { expectType } from 'tsd'

import { normalizeBy } from '..'

interface MyObj { id: 'a' | 'b' | 'c' }

const arr: MyObj[] = [
  { id: 'a' },
  { id: 'b' },
  { id: 'c' },
]

expectType<Record<'a' | 'b' | 'c', MyObj>>(normalizeBy('id', arr))
expectType<Record<'a' | 'b' | 'c', MyObj>>(normalizeBy('id')(arr))
