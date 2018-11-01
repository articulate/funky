const { expect } = require('chai')
const always     = require('ramda/src/always')

const { combineP } = require('..')

const combineFn = always(Promise.resolve({ foo: 'bar' }))

describe('combineP', () => {
  it('merges with the results of the function', () =>
    combineP(combineFn, { baz: 'bip' }).then(res => {
      expect(res).to.eql({
        foo: 'bar',
        baz: 'bip',
      })
    })
  )

  it('is curried', () =>
    combineP(combineFn)({ baz: 'bip' }).then(res => {
      expect(res).to.eql({
        foo: 'bar',
        baz: 'bip',
      })
    })
  )
})
