const { expect } = require('chai')
const always     = require('ramda/src/always')

const { combine } = require('..')

describe('combine', () => {
  context('when partially applied', () => {
    it('merges with the results of the function', () =>
      expect(
        combine(always({ foo: 'bar' }))({ baz: 'bip' })
      ).to.eql({ foo: 'bar', baz: 'bip' })
    )
  })

  context('when all arguments provided', () => {
    it('merges with the results of the function', () =>
      expect(
        combine(always({ foo: 'bar' }), { baz: 'bip' })
      ).to.eql({ foo: 'bar', baz: 'bip' })
    )
  })
})
