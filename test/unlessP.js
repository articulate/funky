const { expect } = require('chai')
const property   = require('prop-factory')
const spy        = require('@articulate/spy')

const { even } = require('./lib/async')
const { unlessP } = require('..')

describe('unlessP', () => {
  const res = property()
  const addSpy = spy()

  const add = a => b => {
    addSpy(a, b)
    return Promise.resolve(a + b)
  }

  const addOneUnlessEven =
    unlessP(even, add(1))

  afterEach(() =>
    addSpy.reset()
  )

  describe('when the predicate resolves with a truthy value', () => {
    beforeEach(() =>
      addOneUnlessEven(2).then(res)
    )

    it('does not call the supplied function', () =>
      expect(addSpy.calls.length).to.equal(0)
    )

    it('resolves with the original value', () =>
      expect(res()).to.equal(2)
    )
  })

  describe('when the predicate resolves with a falsey value', () => {
    beforeEach(() =>
      addOneUnlessEven(3).then(res)
    )

    it('calls the supplied function', () =>
      expect(addSpy.calls[0]).to.eql([ 1, 3 ])
    )

    it('resolves with the result of the supplied function', () =>
      expect(res()).to.equal(4)
    )
  })
})
