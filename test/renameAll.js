const { expect } = require('chai')

const { renameAll } = require('..')

describe('renameAll', () => {
  const orig = {
    color: 'red',
    name: 'bird',
    sounds: {
      call: 'chirp'
    },
    title: 'My title',
    latestTitle: 'haha (business)',
  }

  const renames = {
    color: 'appearance',
    count: 'number',
    sounds: {
      call: 'say'
    },
    latestTitle: 'title',
    title: 'updatedTitle',
  }

  const expected = {
    appearance: 'red',
    name: 'bird',
    sounds: {
      say: 'chirp'
    },
    title: 'haha (business)',
    updatedTitle: 'My title',
  }

  it('renames multiple nested properties on an object using a name-map', () =>
    expect(renameAll(renames, orig)).to.eql(expected)
  )

  it('is curried', () =>
    expect(renameAll(renames)(orig)).to.eql(expected)
  )

  it('does not error in the pathological case', () =>
    expect(renameAll({}, orig)).to.eql(orig)
  )
})
