const { expect } = require('chai')
const add        = require('ramda/src/add')
const multiply   = require('ramda/src/multiply')

const { combineWith } = require('..')

describe('combineWith', () => {
  it('combines with the results of the function', () =>
    expect(combineWith(multiply, add(2), 3)).to.eql(15)
  )

  it('is curried', () => {
    expect(combineWith(multiply, add(2))(3)).to.eql(15)
    expect(combineWith(multiply)(add(2))(3)).to.eql(15)
  })
})
