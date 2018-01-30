const { expect } = require('chai')

const { assocWith } = require('..')

const concatBarToFoo = obj =>
  obj.foo + 'bar'

const doIt = assocWith('baz', concatBarToFoo)

describe('assocWith', () => {
  it('sets the foo property to the result of the function', () =>
    expect(doIt({ foo: 'foo' })).to.eql({ foo: 'foo', baz: 'foobar' })
  )
})
