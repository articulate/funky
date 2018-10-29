const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { combineAllP } = require('..')

describe('combineAll', () => {
  context('when partially applied', () => {
    const res = property()

    beforeEach(() =>
      combineAllP([
        always(Promise.resolve({ foo: 1 })),
        always(Promise.resolve({ bar: 2 })),
      ])({ baz: 3 }).then(res)
    )

    it('combines the results of all functions', () =>
      expect(res()).to.eql({ foo: 1, bar: 2, baz: 3 })
    )
  })

  context('when all arguments provided', () => {
    const res = property()

    beforeEach(() =>
      combineAllP([
        always(Promise.resolve({ foo: 1 })),
        always(Promise.resolve({ bar: 2 })),
      ], { baz: 3 }).then(res)
    )

    it('combines the results of all functions', () =>
      expect(res()).to.eql({ foo: 1, bar: 2, baz: 3 })
    )
  })
})
