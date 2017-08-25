const { expect } = require('chai')
const property   = require('prop-factory')

const { backoff } = require('..')

const fails = times => {
  let count = 0
  return () =>
    ++count < times
      ? Promise.reject(count)
      : Promise.resolve(count)
}

const sureThing   = backoff(16, 5, fails(0))
const failsThrice = backoff(16, 5, fails(3))
const badDay      = backoff(16, 5, fails(10))

describe('backoff', () => {
  const res = property()

  describe('when function succeeds', () => {
    beforeEach(() =>
      sureThing().then(res)
    )

    it('only runs once', () =>
      expect(res()).to.equal(1)
    )
  })

  describe('when function fails a little', () => {
    beforeEach(() =>
      failsThrice().then(res)
    )

    it('retries until success', () =>
      expect(res()).to.equal(3)
    )
  })

  describe('when functions fails a lot', () => {
    beforeEach(() =>
      badDay().catch(res)
    )

    it('retries the max number of times before rejecting', () =>
      expect(res()).to.equal(5)
    )
  })
})
