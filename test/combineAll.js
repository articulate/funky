const { expect } = require('chai')
const always     = require('ramda/src/always')

const { combineAll } = require('..')

describe('combineAll', () => {
  context('when partially applied', () => {
    it('combines the results of all functions', () =>
      expect(
        combineAll([
          always({ foo: 1 }),
          always({ bar: 2 }),
        ])({ baz: 3 })
      ).to.eql({ foo: 1, bar: 2, baz: 3 })
    )
  })

  context('when all arguments provided', () => {
    it('combines the results of all functions', () =>
      expect(
        combineAll([
          always({ foo: 1 }),
          always({ bar: 2 }),
        ], { baz: 3 })
      ).to.eql({ foo: 1, bar: 2, baz: 3 })
    )
  })
})
