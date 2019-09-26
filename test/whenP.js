const { expect } = require('chai')
const property   = require('prop-factory')
const spy        = require('@articulate/spy')

const { even } = require('./lib/async')
const { whenP } = require('..')

describe('whenP', () => {
  const res = property()
  const addSpy = spy()

  const add = a => b => {
    addSpy(a, b)
    return Promise.resolve(a + b)
  }

  const addOneWhenEven =
    whenP(even, add(1))

  afterEach(() =>
    addSpy.reset()
  )

  describe('when the predicate resolves with a truthy value', () => {
    beforeEach(() =>
      addOneWhenEven(2).then(res)
    )

    it('calls the supplied function', () =>
      expect(addSpy.calls[0]).to.eql([ 1, 2 ])
    )

    it('resolves with the result of the supplied function', () =>
      expect(res()).to.equal(3)
    )
  })

  describe('when the predicate resolves with a falsey value', () => {
    beforeEach(() =>
      addOneWhenEven(3).then(res)
    )

    it('does not call the supplied function', () =>
      expect(addSpy.calls.length).to.equal(0)
    )

    it('resolves with the original value', () =>
      expect(res()).to.equal(3)
    )
  })
})
