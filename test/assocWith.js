const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { assocWith } = require('..')

const assigner = assocWith('foo', always('bar'))

describe('assocWith', () => {
  const res = property()

  beforeEach(() =>
    res(assigner({}))
  )

  it('sets the foo property to the result of the function', () =>
    expect(res()).to.eql({ foo: 'bar' })
  )
})
