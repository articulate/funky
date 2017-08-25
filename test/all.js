const { expect } = require('chai')
const property   = require('prop-factory')

const { all } = require('..')

describe('all', () => {
  const res = property()

  beforeEach(() =>
    all([
      Promise.resolve(1),
      Promise.resolve(2)
    ]).then(res)
  )

  it('is a bound version of Promise.all', () =>
    expect(res()).to.eql([ 1, 2 ])
  )
})
