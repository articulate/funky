const { expect } = require('chai')

const { add, mult }    = require('./lib/async')
const { combineWithP } = require('..')

describe('combineWithP', () => {
  it('combines with the results of the function', () =>
    combineWithP(mult, add(2))(3).then(res => {
      expect(res).to.equal(15)
    })
  )

  describe('argument application', () => {
    it('apply fn(x)(x)(x)', () =>
      combineWithP(mult)(add(2))(3).then(res => {
        expect(res).to.equal(15)
      })
    )
  })
})
