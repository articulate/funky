const { expect } = require('chai')
const property   = require('prop-factory')

const { assocWithP } = require('..')

const concatBarToFoo = obj =>
  Promise.resolve(obj.foo + 'bar')

describe('assocWith', () => {
  context('when partially applied', () => {
    const res = property()

    beforeEach(() =>
      assocWithP('baz', concatBarToFoo)({ foo: 'foo' }).then(res)
    )

    it('sets the foo property to the result of the function', () =>
      expect(res()).to.eql({ foo: 'foo', baz: 'foobar' })
    )
  })

  context('when all arguments provided', () => {
    const res = property()

    beforeEach(() =>
      assocWithP('baz', concatBarToFoo, { foo: 'foo' }).then(res)
    )

    it('sets the foo property to the result of the function', () =>
      expect(res()).to.eql({ foo: 'foo', baz: 'foobar' })
    )
  })
})
