const { expect } = require('chai')

const { rename } = require('..')

describe('rename', () => {
  context('when partially applied', () => {
    it('renames a property on an object to a different key', () =>
      expect(rename('foo', 'baz')({ foo: 'bar' }))
        .to.eql({ baz: 'bar' })
    )

    it('does not "rename" missing properties', () =>
      expect(rename('foo', 'baz')({ not: 'bar' }))
        .to.not.have.property('foo')
    )
  })

  context('when all arguments provided', () => {
    it('renames a property on an object to a different key', () =>
      expect(rename('foo', 'baz', { foo: 'bar' }))
        .to.eql({ baz: 'bar' })
    )
  })

  it('does not "rename" missing properties', () =>
    expect(rename('foo', 'baz', { not: 'bar' }))
      .to.not.have.property('foo')
  )
})
