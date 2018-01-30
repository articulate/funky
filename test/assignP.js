const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { assignP } = require('..')

const assigner = assignP('foo', always(Promise.resolve('bar')))

describe('assignP', () => {
  const res = property()

  beforeEach(() =>
    assigner({}).then(res)
  )

  it('sets the foo property to the result of the function', () =>
    expect(res()).to.eql({ foo: 'bar' })
  )
})
