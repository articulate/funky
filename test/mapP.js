const { expect } = require('chai')
const property   = require('prop-factory')

const { add }  = require('./lib/async')
const { mapP } = require('..')

describe('mapP', () => {
  const res = property()

  context('an array argument', () => {
    beforeEach(() =>
      mapP(add(1), [ 1, 2, 3 ]).then(res)
    )

    it('maps over a list with an async function', () =>
      expect(res()).to.eql([ 2, 3, 4 ])
    )
  })

  context('an object argument', () => {
    beforeEach(() =>
      mapP(add(1), { foo: 1, bar: 2, baz: 3 }).then(res)
    )

    it('maps over a list with an async function', () =>
      expect(res()).to.eql({ foo: 2, bar: 3, baz: 4 })
    )
  })
})
