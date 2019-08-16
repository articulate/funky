const { expect } = require('chai')

const { renamePick } = require('..')

describe('renamePick', () => {
  const orig = {
    color: 'red',
    name: 'bird',
    sounds: {
      call: 'chirp'
    }
  }

  const renames = {
    color: 'appearance',
    count: 'number',
    sounds: {
      call: 'say'
    }
  }

  const expected = {
    appearance: 'red',
    sounds: {
      say: 'chirp'
    }
  }

  it('renames multiple nested properties on an object using a name-map', () =>
    expect(renamePick(renames, orig)).to.eql(expected)
  )

  it('is curried', () =>
    expect(renamePick(renames)(orig)).to.eql(expected)
  )

  it('does not error in the pathological case', () =>
    expect(renamePick({}, orig)).to.eql({})
  )
})
