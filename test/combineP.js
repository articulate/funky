const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { combineP } = require('..')

const whatevs = combineP(always(Promise.resolve({ foo: 'bar' })))

describe('combine', () => {
  const res = property()

  beforeEach(() =>
    whatevs({ baz: 'bip' }).then(res)
  )

  it('merges with the results of the function', () =>
    expect(res()).to.eql({
      foo: 'bar',
      baz: 'bip',
    })
  )
})
