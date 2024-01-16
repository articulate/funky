import { expectAssignable } from 'tsd'

import { assocWith } from '..'

function concatBarToFoo(obj: { foo: 'foo' }): 'foobar' {
  return obj.foo + 'bar' as 'foobar'
}

type Result = { foo: 'foo', baz: 'foobar' }

expectAssignable<Result>(assocWith('baz', concatBarToFoo, { foo: 'foo' }))
expectAssignable<Result>(assocWith('baz')(concatBarToFoo)({ foo: 'foo' }))
expectAssignable<Result>(assocWith('baz', concatBarToFoo)({ foo: 'foo' }))
expectAssignable<Result>(assocWith('baz')(concatBarToFoo, { foo: 'foo' }))
