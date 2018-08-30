const { expect } = require('chai')
const omit = require('ramda/src/omit')

const { mapValues } = require('..')

describe('mapValues', () => {
  it('applies a function to the values of an object', () => {
    const fn = omit([ 'a' ])
    const data = {
      foo: { a: 1, b: 2, c: 3 },
      bar: { a: 4, b: 5, c: 6 },
    }
    expect(mapValues(fn, data)).to.eql({
      foo: { b: 2, c: 3 },
      bar: { b: 5, c: 6 },
    })
  })

  it('is curried', () => {
    const fn = omit([ 'a' ])
    const data = {
      foo: { a: 1, b: 2, c: 3 },
      bar: { a: 4, b: 5, c: 6 },
    }
    expect(mapValues(fn)(data)).to.eql({
      foo: { b: 2, c: 3 },
      bar: { b: 5, c: 6 },
    })
  })
})
