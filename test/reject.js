const { expect } = require('chai')
const property   = require('prop-factory')

const { reject } = require('..')

describe('reject', () => {
  const res = property()

  describe('regular errors', () => {
    beforeEach(() =>
      reject(new Error('bad')).catch(res)
    )

    it('is a bound version of Promise.reject', () =>
      expect(res().message).to.equal('bad')
    )
  })

  describe('when non-error is rejected', () => {
    beforeEach(() =>
      reject('bad').catch(res)
    )

    it('wraps it in an error', () =>
      expect(res().message).to.equal('bad')
    )
  })
})
