import { expectAssignable } from 'tsd'

import { combineP } from '..'

const mixin = { foo: 'bar' as const }
const input = { baz: 'bip' as const }

function K(x: typeof mixin) {
  return async (y: typeof input) => x
}

type Expectation = Promise<{ foo: 'bar', baz: 'bip' }>

expectAssignable<Expectation>(combineP(K(mixin))(input))
