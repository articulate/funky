import { curry } from 'ramda'
import { expectAssignable } from 'tsd'
import { assembleP } from '..'

const add  = curry((a: number, b: number) => Promise.resolve(a + b))
const mult = curry((a: number, b: number) => Promise.resolve(a * b))

const xfrmsUnary = {
  foo: [[ add(1) ]] as [[ (x: number) => Promise<number> ]],
  bar: [{ baz: mult(2) }] as [{ baz: (x: number) => Promise<number> }],
  bat: 1
} as const

type ExpectationUnary = Promise<{
  foo: [[ number ]],
  bar: [{ baz: number }],
  bat: number
}>

expectAssignable<ExpectationUnary>(assembleP(xfrmsUnary, 1))
expectAssignable<ExpectationUnary>(assembleP(xfrmsUnary)(1))

const xfrmsNary = {
  foo: (one: string, two: string) => Promise.resolve([ one, two ].join(',')),
  bar: {
    baz: (one: string, two: string, three: string) => Promise.resolve([ one, two, three ].join('|')),
  },
  bat: 1
}

type ExpectationNary = Promise<{
  foo: string,
  bar: { baz: string },
  bat: number
}>

expectAssignable<ExpectationNary>(assembleP(xfrmsNary, 'one', 'two', 'three'))
expectAssignable<ExpectationNary>(assembleP(xfrmsNary)('one', 'two', 'three'))
expectAssignable<ExpectationNary>(assembleP(xfrmsNary)('one')('two', 'three'))
expectAssignable<ExpectationNary>(assembleP(xfrmsNary)('one')('two')('three'))

const xfrms0ary = {
  foo: (...params: string[]) => Promise.resolve(params.join(',')),
  bar: {
    baz: (...params: string[]) => Promise.resolve(params.join('|')),
  },
  bat: 1
}

type Expectation0ary = Promise<{
  foo: string,
  bar: {
    baz: string,
  },
  bat: number
}>

expectAssignable<Expectation0ary>(assembleP(xfrms0ary, 'one', 'two', 'three'))
expectAssignable<Expectation0ary>(assembleP(xfrms0ary)('one', 'two', 'three'))
