const { expect } = require('chai')

const { copyProp } = require('..')

describe('copyProp', () => {
  it('copies one property on an object to another key', () =>
    expect(copyProp('foo', 'baz', { foo: 'bar' }))
      .to.eql({ baz: 'bar', foo: 'bar' })
  )
})
