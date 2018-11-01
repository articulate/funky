const { expect } = require('chai')

const { assocWith } = require('..')

const concatBarToFoo = obj =>
  obj.foo + 'bar'

describe('assocWith', () => {
  it('sets the foo property to the result of the function', () =>
    expect(assocWith('baz', concatBarToFoo, { foo: 'foo' }))
      .to.eql({ foo: 'foo', baz: 'foobar' })
  )

  describe('argument application', () => {
    it('apply fn(x)(x)(x)', () =>
      expect(assocWith('baz')(concatBarToFoo)({ foo: 'foo' }))
        .to.eql({ foo: 'foo', baz: 'foobar' })
    )

    it('apply fn(x, x)(x)', () =>
      expect(assocWith('baz', concatBarToFoo)({ foo: 'foo' }))
        .to.eql({ foo: 'foo', baz: 'foobar' })
    )

    it('apply fn(x)(x, x)', () =>
      expect(assocWith('baz')(concatBarToFoo, { foo: 'foo' }))
        .to.eql({ foo: 'foo', baz: 'foobar' })
    )
  })
})
