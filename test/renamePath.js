const { expect } = require('chai')

const { renamePath } = require('..')

describe('renamePath', () => {
  const orig     = { a: { b: 'b' }, c: 'c' }
  const expected = { a: { B: 'b' }, c: 'c' }

  context('when partially applied', () => {
    it('renames a deeply nested path on an object', () => {
      expect(renamePath(['a', 'b'])('B', orig)).to.eql(expected)
      expect(renamePath(['a', 'b'], 'B')(orig)).to.eql(expected)
      expect(renamePath(['a', 'b'])('B')(orig)).to.eql(expected)
    })
  })

  context('when all arguments provided', () => {
    it('renames a deeply nested path on an object', () =>
      expect(renamePath(['a', 'b'], 'B', orig)).to.eql(expected)
    )
  })
})
