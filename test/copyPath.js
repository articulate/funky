const { expect } = require('chai')

const { copyPath } = require('..')

describe('copyPath', () => {
  it('copies one path on an object to another path', () =>
    expect(
      copyPath(['foo', 'baz'], ['meta', 'bar'], {
        foo: { baz: 'hey' },
        meta: { secret: 'sec' }
      })
    ).to.eql({ foo: { baz: 'hey' }, meta: { secret: 'sec', bar: 'hey' } }))
})
