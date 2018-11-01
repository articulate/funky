const { expect } = require('chai')

const { assocWith } = require('..')

const concatBarToFoo = obj =>
  obj.foo + 'bar'

describe('assocWith', () => {
  it('sets the foo property to the result of the function', () =>
    expect(assocWith('baz', concatBarToFoo, { foo: 'foo' }))
      .to.eql({ foo: 'foo', baz: 'foobar' })
  )

  it('is curried', () => {
    expect(assocWith('baz', concatBarToFoo)({ foo: 'foo' }))
      .to.eql({ foo: 'foo', baz: 'foobar' })

    expect(assocWith('baz')(concatBarToFoo)({ foo: 'foo' }))
      .to.eql({ foo: 'foo', baz: 'foobar' })
  })
})
