import { expectAssignable } from 'tsd'

import { copyPath } from '..'

expectAssignable<{
  foo: { baz: 'hey' },
  meta: { secret: 'sec', bar: 'hey'}
}>(copyPath(
  ['foo', 'baz'],
  ['meta', 'bar'],
  {
    foo: { baz: 'hey' as const },
    meta: { secret: 'sec' as const }
  }
))
