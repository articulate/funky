const { expect } = require('chai')

const { normalizeBy } = require('..')

const items = [
  { id: 'a' },
  { id: 'b' },
  { id: 'c' }
]

describe('normalizeBy', () => {
  it('normalizes a list by the specified key', () =>
    expect(normalizeBy('id', items))
      .to.eql({
        a: { id: 'a' },
        b: { id: 'b' },
        c: { id: 'c' }
      })
  )

  it('is curried', () =>
    expect(normalizeBy('id')(items))
      .to.eql({
        a: { id: 'a' },
        b: { id: 'b' },
        c: { id: 'c' }
      })
  )
})
