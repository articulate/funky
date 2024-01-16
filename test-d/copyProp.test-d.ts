import { expectAssignable } from 'tsd'

import { copyProp } from '..'

expectAssignable<{ baz: 'bar', foo: 'bar' }>(
  copyProp('foo', 'baz', { foo: 'bar' as const }),
)
