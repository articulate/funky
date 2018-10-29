const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult } = require('./lib/async')
const { useWithP } = require('..')

describe('useWithP', () => {
  const res = property()

  beforeEach(() =>
    useWithP(mult, [ add(1), add(2) ])(3)(4).then(res)
  )

  it('transforms arguments with async functions', () =>
    expect(res()).to.equal(24) // (3 + 1) * (4 + 2)
  )
})
