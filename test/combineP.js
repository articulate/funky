const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { combineP } = require('..')

const combineFn = always(Promise.resolve({ foo: 'bar' }))

describe('combine', () => {
  context('when partially applied', () => {
    const res = property()

    beforeEach(() =>
      combineP(combineFn)({ baz: 'bip' }).then(res)
    )

    it('merges with the results of the function', () =>
      expect(res()).to.eql({
        foo: 'bar',
        baz: 'bip',
      })
    )
  })

  context('when all arguments provided', () => {
    const res = property()

    beforeEach(() =>
      combineP(combineFn, { baz: 'bip' }).then(res)
    )

    it('merges with the results of the function', () =>
      expect(res()).to.eql({
        foo: 'bar',
        baz: 'bip',
      })
    )
  })
})
