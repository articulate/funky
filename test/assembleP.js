const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult } = require('./lib/async')
const { assembleP } = require('..')

const assembly = assembleP({ foo: add(1), bar: { baz: mult(3) }, bat: 1 })

describe('assembleP', () => {
  const res = property()

  beforeEach(() =>
    assembly(1).then(res)
  )

  it('assembles the result of async transforms into a new object', () =>
    expect(res()).to.eql({ foo: 2, bar: { baz: 3 }, bat: 1 })
  )
})
