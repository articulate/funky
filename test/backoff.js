const { expect } = require('chai')
const { gte }    = require('ramda')
const property   = require('prop-factory')

const { backoff } = require('..')

const fails = times => {
  let count = 0
  return () =>
    ++count < times
      ? Promise.reject(count)
      : Promise.resolve(count)
}

const opts = { base: 16, tries: 5 }

const sureThing   = backoff(opts, fails(0))
const failsThrice = backoff(opts, fails(3))
const badDay      = backoff(opts, fails(10))

const conditional = backoff({ base: 16, tries: 5, when: gte(2) }, fails(10))

describe('backoff', () => {
  const res = property()

  describe('with no options', () => {
    const defaulted = backoff(undefined, fails(1))

    beforeEach(() =>
      defaulted('a').then(res)
    )

    it('has safe defaults', () =>
      expect(res()).to.equal(1)
    )
  })

  describe('when function succeeds', () => {
    beforeEach(() =>
      sureThing('a').then(res)
    )

    it('only runs once', () =>
      expect(res()).to.equal(1)
    )
  })

  describe('when function fails a little', () => {
    beforeEach(() =>
      failsThrice('a').then(res)
    )

    it('retries until success', () =>
      expect(res()).to.equal(3)
    )
  })

  describe('when functions fails a lot', () => {
    beforeEach(() =>
      badDay('a').catch(res)
    )

    it('retries the max number of times before rejecting', () =>
      expect(res()).to.equal(5)
    )
  })

  describe('when backoff predicate supplied', () => {
    beforeEach(() =>
      conditional('a').catch(res)
    )

    it('retries only when predicate passes', () =>
      expect(res()).to.equal(3)
    )
  })
})
