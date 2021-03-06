const { expect } = require('chai')
const property   = require('prop-factory')
const spy        = require('@articulate/spy')

const { add }  = require('./lib/async')
const { tapP } = require('..')

describe('tapP', () => {
  const res  = property()
  const func = spy()

  beforeEach(() =>
    add(2, 2)
      .then(tapP(func))
      .then(res)
  )

  afterEach(() =>
    func.reset()
  )

  it('runs the function with the supplied value', () =>
    expect(func.calls[0]).to.eql([4])
  )

  it('resolves with the original value', () =>
    expect(res()).to.equal(4)
  )
})
