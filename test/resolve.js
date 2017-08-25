const { expect } = require('chai')
const property   = require('prop-factory')

const { resolve } = require('..')

describe('resolve', () => {
  const res = property()

  beforeEach(() =>
    resolve(2).then(res)
  )

  it('is a bound version of resolve', () =>
    expect(res()).to.equal(2)
  )
})
