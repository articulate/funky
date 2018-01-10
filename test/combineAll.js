const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { combineAll } = require('..')

const whatevs = combineAll([
  always({ foo: 1 }),
  always({ bar: 2 }),
])

describe('combineAll', () => {
  const res = property()

  beforeEach(() =>
    res(whatevs({ baz: 3 }))
  )

  it('combines the results of all functions', () =>
    expect(res()).to.eql({
      foo: 1,
      bar: 2,
      baz: 3,
    })
  )
})
