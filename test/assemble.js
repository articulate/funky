const { add }    = require('ramda')
const { expect } = require('chai')

const { assemble } = require('..')

describe('assemble', () => {
  const xfrms = {
    foo: add(1),
    bar: {
      baz: add(2)
    },
    bat: 1
  }

  it('assembles the result of multiple transforms into a new object', () =>
    expect(assemble(xfrms, 1)).to.eql({ foo: 2, bar: { baz: 3 }, bat: 1 })
  )

  it('is curried', () =>
    expect(assemble(xfrms)(1)).to.eql({ foo: 2, bar: { baz: 3 }, bat: 1 })
  )
})
