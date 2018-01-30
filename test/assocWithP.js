const { expect } = require('chai')
const property   = require('prop-factory')

const { assocWithP } = require('..')

const concatBarToFoo = obj =>
  Promise.resolve(obj.foo + 'bar')

const doIt = assocWithP('baz', concatBarToFoo)

describe('assocWith', () => {
  const res = property()

  beforeEach(() =>
    doIt({ foo: 'foo' }).then(res)
  )

  it('sets the foo property to the result of the function', () =>
    expect(res()).to.eql({ foo: 'foo', baz: 'foobar' })
  )
})
