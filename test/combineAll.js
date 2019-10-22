const { expect } = require('chai')
const always     = require('ramda/src/always')
const curryN     = require('ramda/src/curryN')

const { combineAll } = require('..')

describe('combineAll', () => {
  describe('unary', () => {
    const actions = [
      curryN(1, always({ foo: 1 })),
      curryN(1, always({ bar: 2 })),
    ]

    it('combines the results of all functions', () =>
      expect(combineAll(actions, { baz: 3 }))
        .to.eql({ foo: 1, bar: 2, baz: 3 })
    )

    it('is curried', () =>
      expect(combineAll(actions)({ baz: 3 }))
        .to.eql({ foo: 1, bar: 2, baz: 3 })
    )

    it('returns max function length', () => {
      expect(combineAll(actions).length).to.equal(1)
    })
  })

  describe('n-ary', () => {
    const actions = [
      curryN(2, always({ foo: 1 })),
      curryN(3, always({ bar: 2 })),
    ]

    it('combines the results of all functions', () =>
      expect(combineAll(actions, { baz: 3 }, { bop: 4 }, { boo: 5 }))
        .to.eql({ foo: 1, bar: 2, baz: 3 })
    )

    it('is curried', () => {
      expect(combineAll(actions)({ baz: 3 }, { bop: 4 }, { boo: 5 }))
        .to.eql({ foo: 1, bar: 2, baz: 3 })
      expect(combineAll(actions)({ baz: 3 })({ bop: 4 }, { boo: 5 }))
        .to.eql({ foo: 1, bar: 2, baz: 3 })
      expect(combineAll(actions)({ baz: 3 })({ bop: 4 })({ boo: 5 }))
        .to.eql({ foo: 1, bar: 2, baz: 3 })
    })

    it('returns max function length', () => {
      expect(combineAll(actions).length).to.equal(3)
    })
  })

  describe('0-ary', () => {
    const actions = [
      always({ foo: 1 }),
      always({ bar: 2 }),
    ]

    it('combines the results of all functions', () =>
      expect(combineAll(actions, { baz: 3 }))
        .to.eql({ foo: 1, bar: 2, baz: 3 })
    )

    it('is curried', () =>
      expect(combineAll(actions)({ baz: 3 }))
        .to.eql({ foo: 1, bar: 2, baz: 3 })
    )

    it('returns max function length', () => {
      expect(combineAll(actions).length).to.equal(0)
    })
  })
})
