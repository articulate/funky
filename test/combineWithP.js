const { expect } = require('chai')

const { add, mult }    = require('./lib/async')
const { combineWithP } = require('..')

describe('combineWithP', () => {
  it('combines with the results of the function', () =>
    combineWithP(mult, add(2), 3).then(res => {
      expect(res).to.equal(15)
    })
  )

  it('is curried, arity 1', () =>
    combineWithP(mult, add(2))(3).then(res => {
      expect(res).to.equal(15)
    })
  )

  it('is curried, arity 2', () =>
    combineWithP(mult)(add(2), 3).then(res => {
      expect(res).to.equal(15)
    })
  )

  it('is curried, arity 2, unary', () =>
    combineWithP(mult)(add(2))(3).then(res => {
      expect(res).to.equal(15)
    })
  )
})
