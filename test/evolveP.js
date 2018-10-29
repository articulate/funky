const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult } = require('./lib/async')
const { evolveP }   = require('..')

describe('evolveP', () => {
  context('when partially applied', () => {
    const res = property()

    beforeEach(() =>
      evolveP(
        { foo: add(2), bar: { baz: mult(3) } }
      )({ foo: 1, bar: { baz: 1 }, bat: 1 }).then(res)
    )

    it('recursively evolves an async shallow copy (??) of an object', () =>
      expect(res()).to.eql({ foo: 3, bar: { baz: 3 }, bat: 1 })
    )
  })

  context('when all arguments provided', () => {
    const res = property()

    beforeEach(() =>
      evolveP(
        { foo: add(2), bar: { baz: mult(3) } },
        { foo: 1, bar: { baz: 1 }, bat: 1 }
      ).then(res)
    )

    it('recursively evolves an async shallow copy (??) of an object', () =>
      expect(res()).to.eql({ foo: 3, bar: { baz: 3 }, bat: 1 })
    )
  })
})
