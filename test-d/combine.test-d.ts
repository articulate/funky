import { expectAssignable } from 'tsd'

import { combine } from '..'

const mixin = { foo: 'bar' as const }
const input = { baz: 'bip' as const }

function K(x: typeof mixin) {
  return (y: typeof input) => x
}

type Expectation = { foo: 'bar', baz: 'bip' }

expectAssignable<Expectation>(combine(K(mixin), input))
expectAssignable<Expectation>(combine(K(mixin))(input))
