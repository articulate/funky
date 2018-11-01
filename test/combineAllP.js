const { expect } = require('chai')
const always     = require('ramda/src/always')

const { combineAllP } = require('..')

const actions = [
  always(Promise.resolve({ foo: 1 })),
  always(Promise.resolve({ bar: 2 })),
]

describe('combineAllP', () => {
  it('combines the results of all functions', () =>
    combineAllP(actions, { baz: 3 }).then(res => {
      expect(res).to.eql({ foo: 1, bar: 2, baz: 3 })
    })
  )

  it('is curried', () =>
    combineAllP(actions)({ baz: 3 }).then(res => {
      expect(res).to.eql({ foo: 1, bar: 2, baz: 3 })
    })
  )
})
