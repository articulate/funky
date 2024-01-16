import { expectAssignable } from 'tsd'

import { combineAll } from '..'

const input = { baz: 3 as const }

const actions = [
  K({ foo: 1 as const }),
  K({ bar: 2 as const }),
] as const

function K<T>(x: T) {
  return (y: typeof input) => x
}

type Expectation = {
  foo: 1,
  bar: 2,
  baz: 3,
}

expectAssignable<Expectation>(combineAll(actions, input))
expectAssignable<Expectation>(combineAll(actions)(input))
