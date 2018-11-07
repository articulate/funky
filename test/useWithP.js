const { expect } = require('chai')

const { add, mult } = require('./lib/async')
const { useWithP } = require('..')

describe('useWithP', () => {
  it('transforms arguments with async functions', () =>
    useWithP(mult, [ add(1), add(2) ])(3, 4).then(res => {
      expect(res).to.equal(24) // (3 + 1) * (4 + 2)
    })
  )

  it('is curried', () =>
    useWithP(mult)([ add(1), add(2) ])(3)(4).then(res => {
      expect(res).to.equal(24) // (3 + 1) * (4 + 2)
    })
  )
})
