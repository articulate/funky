const { expect } = require('chai')

const { setProp } = require('..')

describe('setProp', () => {
  it('sets a value in a specific property of an object', () =>
    expect(setProp('foo', {}, 'bar'))
      .to.eql({ foo: 'bar' })
  )

  it('overwrites a value in a specific property of an object', () =>
    expect(setProp('foo', { foo: 'bar' }, 'baz'))
      .to.eql({ foo: 'baz' })
  )
})
