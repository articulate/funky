const { expect } = require('chai')

const { assocWithP } = require('..')

const concatBarToFoo = obj =>
  Promise.resolve(obj.foo + 'bar')

describe('assocWithP', () => {
  it('sets the foo property to the result of the function', () =>
    assocWithP('baz', concatBarToFoo, { foo: 'foo' }).then(res => {
      expect(res).to.eql({ foo: 'foo', baz: 'foobar' })
    })
  )

  it('is curried, arity 1', () =>
    assocWithP('baz', concatBarToFoo)({ foo: 'foo' }).then(res => {
      expect(res).to.eql({ foo: 'foo', baz: 'foobar' })
    })
  )

  it('is curried, arity 2, unary', () =>
    assocWithP('baz')(concatBarToFoo)({ foo: 'foo' }).then(res => {
      expect(res).to.eql({ foo: 'foo', baz: 'foobar' })
    })
  )
})
