const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { combine } = require('..')

const whatevs = combine(always({ foo: 'bar' }))

describe('combine', () => {
  const res = property()

  beforeEach(() =>
    res(whatevs({ baz: 'bip' }))
  )

  it('merges with the results of the function', () =>
    expect(res()).to.eql({
      foo: 'bar',
      baz: 'bip',
    })
  )
})
