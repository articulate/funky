const { expect } = require('chai')

const { renamePath } = require('..')

describe('renamePath', () => {
  const orig     = { a: { b: 'b' }, c: 'c' }
  const expected = { a: { B: 'b' }, c: 'c' }

  it('renames a deeply nested path on an object', () =>
    expect(renamePath(['a', 'b'], 'B', orig)).to.eql(expected)
  )

  it('is curried', () => {
    expect(renamePath(['a', 'b'])('B', orig)).to.eql(expected)
    expect(renamePath(['a', 'b'], 'B')(orig)).to.eql(expected)
    expect(renamePath(['a', 'b'])('B')(orig)).to.eql(expected)
  })
})
