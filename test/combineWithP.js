const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult }    = require('./lib/async')
const { combineWithP } = require('..')

const whatevs = combineWithP(mult, add(2))

describe('combineWith', () => {
  const res = property()

  beforeEach(() =>
    whatevs(3).then(res)
  )

  it('combines with the results of the function', () =>
    expect(res()).to.equal(15)
  )
})