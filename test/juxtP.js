const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult } = require('./lib/async')
const { juxtP }     = require('..')

const branches = juxtP([ add, mult ])

describe('juxtP', () => {
  const res = property()

  beforeEach(() =>
    branches(1, 2).then(res)
  )

  it('branches some values across multiple async functions', () =>
    expect(res()).to.eql([ 3, 2 ])
  )
})
