const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { assocWithP } = require('..')

const assigner = assocWithP('foo', always(Promise.resolve('bar')))

describe('assocWithP', () => {
  const res = property()

  beforeEach(() =>
    assigner({}).then(res)
  )

  it('sets the foo property to the result of the function', () =>
    expect(res()).to.eql({ foo: 'bar' })
  )
})
