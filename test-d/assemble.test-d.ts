import { add } from 'ramda'
import { expectAssignable } from 'tsd'
import { assemble } from '..'

const xfrmsUnary = {
  foo: [[ add(1) ]] as [[ (x: number) => number ]],
  bar: [{ baz: add(2) }] as [{ baz: (x: number) => number }],
  bat: 1
} as const

type ExpectationUnary = {
  foo: [[ number ]],
  bar: [{ baz: number }],
  bat: number
}

expectAssignable<ExpectationUnary>(assemble(xfrmsUnary, 1))
expectAssignable<ExpectationUnary>(assemble(xfrmsUnary)(1))

const xfrmsNary = {
  foo: (one: string, two: string) => [ one, two ].join(','),
  bar: {
    baz: (one: string, two: string, three: string) => [ one, two, three ].join('|'),
  },
  bat: 1
}

type ExpectationNary = {
  foo: string,
  bar: { baz: string },
  bat: number
}

expectAssignable<ExpectationNary>(assemble(xfrmsNary, 'one', 'two', 'three'))
expectAssignable<ExpectationNary>(assemble(xfrmsNary)('one', 'two', 'three'))
expectAssignable<ExpectationNary>(assemble(xfrmsNary)('one')('two', 'three'))
expectAssignable<ExpectationNary>(assemble(xfrmsNary)('one')('two')('three'))

const xfrms0ary = {
  foo: (...params: string[]) => params.join(','),
  bar: {
    baz: (...params: string[]) => params.join('|'),
  },
  bat: 1
}

type Expectation0ary = {
  foo: string,
  bar: {
    baz: string,
  },
  bat: number
}

expectAssignable<Expectation0ary>(assemble(xfrms0ary, 'one', 'two', 'three'))
expectAssignable<Expectation0ary>(assemble(xfrms0ary)('one', 'two', 'three'))
