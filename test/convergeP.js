const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult } = require('./lib/async')
const { convergeP } = require('..')

describe('convergeP', () => {
  const res = property()

  beforeEach(() =>
    convergeP(mult, [ add(1), add(2) ])(1).then(res)
  )

  it('branches and converges with async functions', function () {
    expect(res()).to.equal(6)
  })
})
