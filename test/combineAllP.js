const { expect } = require('chai')
const property   = require('prop-factory')
const always     = require('ramda/src/always')

const { combineAllP } = require('..')

const whatevs = combineAllP([
  always(Promise.resolve({ foo: 1 })),
  always(Promise.resolve({ bar: 2 })),
])

describe('combineAll', () => {
  const res = property()

  beforeEach(() =>
    whatevs({ baz: 3 }).then(res)
  )

  it('combines the results of all functions', () =>
    expect(res()).to.eql({
      foo: 1,
      bar: 2,
      baz: 3,
    })
  )
})
