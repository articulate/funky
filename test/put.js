const { expect } = require('chai')

const { put } = require('..')

describe('put', () => {
  it('sets a value in a specific property of an object', () =>
    expect(put('foo', {}, 'bar'))
      .to.eql({ foo: 'bar' })
  )

  it('overwrites a value in a specific property of an object', () =>
    expect(put('foo', { foo: 'bar' }, 'baz'))
      .to.eql({ foo: 'baz' })
  )
})
