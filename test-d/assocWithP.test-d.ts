import { expectAssignable } from 'tsd'

import { assocWithP } from '..'

async function concatBarToFoo(obj: { foo: 'foo' }): Promise<'foobar'> {
  return obj.foo + 'bar' as 'foobar'
}

type Result = Promise<{ foo: 'foo', baz: 'foobar' }>

expectAssignable<Result>(assocWithP('baz', concatBarToFoo, { foo: 'foo' }))
expectAssignable<Result>(assocWithP('baz')(concatBarToFoo)({ foo: 'foo' }))
expectAssignable<Result>(assocWithP('baz', concatBarToFoo)({ foo: 'foo' }))
expectAssignable<Result>(assocWithP('baz')(concatBarToFoo, { foo: 'foo' }))
