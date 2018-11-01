const { expect } = require('chai')
const always     = require('ramda/src/always')

const { combine } = require('..')

describe('combine', () => {
  it('merges with the results of the function', () =>
    expect(
      combine(always({ foo: 'bar' }), { baz: 'bip' })
    ).to.eql({ foo: 'bar', baz: 'bip' })
  )

  it('is curried', () =>
    expect(
      combine(always({ foo: 'bar' }))({ baz: 'bip' })
    ).to.eql({ foo: 'bar', baz: 'bip' })
  )
})
