const { expect } = require('chai')

const { assocWith } = require('..')

const concatBarToFoo = obj =>
  obj.foo + 'bar'

describe('assocWith', () => {
  context('when partially applied', () => {
    it('sets the foo property to the result of the function', () =>
      expect(
        assocWith('baz', concatBarToFoo)({ foo: 'foo' })
      ).to.eql({ foo: 'foo', baz: 'foobar' })
    )
  })

  context('when all arguments provided', () => {
    it('sets the foo property to the result of the function', () =>
      expect(
        assocWith('baz', concatBarToFoo, { foo: 'foo' })
      ).to.eql({ foo: 'foo', baz: 'foobar' })
    )
  })
})
