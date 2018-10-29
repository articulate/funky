const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult }    = require('./lib/async')
const { combineWithP } = require('..')

describe('combineWith', () => {
  context('when partially applied', () => {
    const res = property()

    beforeEach(() =>
      combineWithP(mult, add(2))(3).then(res)
    )

    it('combines with the results of the function', () =>
      expect(res()).to.equal(15)
    )
  })

  context('when all arguments provided', () => {
    const res = property()

    beforeEach(() =>
      combineWithP(mult, add(2), 3).then(res)
    )

    it('combines with the results of the function', () =>
      expect(res()).to.equal(15)
    )
  })
})
