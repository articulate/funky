const { expect } = require('chai')
const always     = require('ramda/src/always')

const { combineAll } = require('..')

const actions = [
  always({ foo: 1 }),
  always({ bar: 2 }),
]

describe('combineAll', () => {
  it('combines the results of all functions', () =>
    expect(combineAll(actions)({ baz: 3 }))
      .to.eql({ foo: 1, bar: 2, baz: 3 })
  )
})
