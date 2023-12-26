import { expectAssignable } from 'tsd'

import { combineAllP } from '..'

const input = { baz: 3 as const }

const actions = [
  K(Promise.resolve({ foo: 1 as const })),
  K(Promise.resolve({ bar: 2 as const })),
] as const

function K<T>(x: T) {
  return (y: typeof input) => x
}

type Expectation = Promise<{
  foo: 1,
  bar: 2,
  baz: 3,
}>

expectAssignable<Expectation>(combineAllP(actions, input))
expectAssignable<Expectation>(combineAllP(actions)(input))
