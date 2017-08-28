const { expect } = require('chai')

const { move } = require('..')

describe('move', () => {
  it('moves a list item from one position to another', () =>
    expect(move(3, 1, [ 0, 1, 2, 3 ])).to.eql([ 0, 3, 1, 2 ])
  )
})
