const { expect } = require('chai')
const property   = require('prop-factory')
const add        = require('ramda/src/add')
const multiply   = require('ramda/src/multiply')

const { combineWith } = require('..')

const whatevs = combineWith(multiply, add(2))

describe('combineWith', () => {
  const res = property()

  beforeEach(() =>
    res(whatevs(3))
  )

  it('combines with the results of the function', () =>
    expect(res()).to.equal(15)
  )
})