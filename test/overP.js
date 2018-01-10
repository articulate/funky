const { expect } = require('chai')
const property   = require('prop-factory')
const lensProp   = require('ramda/src/lensProp')

const { add }   = require('./lib/async')
const { overP } = require('..')

describe('overP', () => {
  const res = property()

  beforeEach(() =>
    overP(lensProp('foo'), add(1), { foo: 47, bar: 2 }).then(res)
  )

  it('transforms over a lens with an async function', () =>
    expect(res()).to.eql({ foo: 48, bar: 2 })
  )
})
