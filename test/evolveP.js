const { expect } = require('chai')

const { add, mult } = require('./lib/async')
const { evolveP }   = require('..')

const arg1 = { foo: add(2), bar: { baz: mult(3) } }
const arg2 = { foo: 1, bar: { baz: 1 }, bat: 1 }

describe('evolveP', () => {
  it('recursively evolves an async shallow copy (??) of an object', () =>
    evolveP(arg1, arg2).then(res => {
      expect(res).to.eql({ foo: 3, bar: { baz: 3 }, bat: 1 })
    })
  )

  it('is curried', () =>
    evolveP(arg1)(arg2).then(res => {
      expect(res).to.eql({ foo: 3, bar: { baz: 3 }, bat: 1 })
    })
  )
})
