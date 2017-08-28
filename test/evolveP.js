const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult } = require('./lib/async')
const { evolveP }   = require('..')

const evolutions = evolveP({ foo: add(2), bar: { baz: mult(3) } })

describe('evolveP', () => {
  const res = property()

  beforeEach(() =>
    evolutions({ foo: 1, bar: { baz: 1 }, bat: 1 }).then(res)
  )

  it('recursively evolves an async shallow copy (??) of an object', () =>
    expect(res()).to.eql({ foo: 3, bar: { baz: 3 }, bat: 1 })
  )
})
