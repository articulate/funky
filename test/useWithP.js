const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult } = require('./lib/async')
const { useWithP } = require('..')

const whatevs = useWithP(mult, [ add(1), add(2) ])

describe('convergeP', () => {
  const res = property()

  beforeEach(() =>
    whatevs(3)(4).then(res)
  )

  it('transforms arguments with async functions', function () {
    expect(res()).to.equal(24) // (3 + 1) * (4 + 2)
  })
})
