import { expectType } from 'tsd'

import { rename } from '..'

type Expectation = { baz: 'bar' }

const input = { foo: 'bar' as const }

expectType<Expectation>(rename('foo', 'baz', input))
expectType<Expectation>(rename('foo', 'baz')(input))
expectType<Expectation>(rename('foo')('baz', input))
expectType<Expectation>(rename('foo')('baz')(input))
