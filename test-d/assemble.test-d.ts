import { add } from 'ramda'
import { expectAssignable } from 'tsd'
import { assemble } from '..'

const xfrms1 = {
  foo: [[ add(1) ]],
  bar: [{ baz: add(2) }],
  bat: 1
} as const

type Expectation1 = {
  foo: [[ number ]],
  bar: [{ baz: number }],
  bat: number
}

expectAssignable<Expectation1>(assemble(xfrms1, 1))
expectAssignable<Expectation1>(assemble(xfrms1)(1))

const xfrms2 = {
  foo: (one: string, two: string, three: string) => [ one, two ].join(','),
  bar: {
    baz: (one: string, two: string, three: string) => [ one, two, three ].join('|'),
  },
  bat: 1
}

type Expectation2 = {
  foo: string,
  bar: { baz: string },
  bat: number
}

expectAssignable<Expectation2>(assemble(xfrms2, 'one', 'two', 'three'))
expectAssignable<Expectation2>(assemble(xfrms2)('one', 'two', 'three'))
expectAssignable<Expectation2>(assemble(xfrms2)('one')('two', 'three'))
expectAssignable<Expectation2>(assemble(xfrms2)('one')('two')('three'))
