const { expect } = require('chai')

const { renameAll } = require('..')

describe('renameAll', () => {
  const orig = {
    color: 'red',
    name: 'bird',
    sound: 'chirp'
  }

  const renames = {
    color: 'appearance',
    count: 'number',
    sound: 'call'
  }

  const expected = {
    appearance: 'red',
    call: 'chirp',
    name: 'bird'
  }

  it('rename multiple properties on an object using a name-map', () =>
    expect(renameAll(renames, orig)).to.eql(expected)
  )

  it('is curried', () =>
    expect(renameAll(renames)(orig)).to.eql(expected)
  )
})
