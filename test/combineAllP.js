const { expect } = require('chai')
const always     = require('ramda/src/always')
const curryN     = require('ramda/src/curryN')

const { combineAllP } = require('..')

describe('combineAllP', () => {
  describe('unary', () => {
    const actions = [
      curryN(1, always(Promise.resolve({ foo: 1 }))),
      curryN(1, always(Promise.resolve({ bar: 2 }))),
    ]

    it('combines the results of all functions', () =>
      combineAllP(actions, { baz: 3 }).then(res => {
        expect(res).to.eql({ foo: 1, bar: 2, baz: 3 })
      })
    )

    it('is curried', () =>
      combineAllP(actions)({ baz: 3 }).then(res => {
        expect(res).to.eql({ foo: 1, bar: 2, baz: 3 })
      })
    )

    it('returns max function length', () => {
      expect(combineAllP(actions).length).to.equal(1)
    })
  })

  describe('n-ary', () => {
    const actions = [
      curryN(2, always(Promise.resolve({ foo: 1 }))),
      curryN(3, always(Promise.resolve({ bar: 2 }))),
    ]

    it('combines the results of all functions', () =>
      combineAllP(actions, { baz: 3 }, { bop: 4 }, { boo: 5 }).then(res => {
        expect(res).to.eql({ foo: 1, bar: 2, baz: 3 })
      })
    )

    it('is curried', () =>
      combineAllP(actions)({ baz: 3 }, { bop: 4 }, { boo: 5 })
        .then(res => { expect(res).to.eql({ foo: 1, bar: 2, baz: 3 }) })
        .then(() => combineAllP(actions)({ baz: 3 })({ bop: 4 }, { boo: 5 }))
        .then(res => { expect(res).to.eql({ foo: 1, bar: 2, baz: 3 }) })
        .then(() => combineAllP(actions)({ baz: 3 })({ bop: 4 })({ boo: 5 }))
        .then(res => { expect(res).to.eql({ foo: 1, bar: 2, baz: 3 }) })
    )

    it('returns max function length', () => {
      expect(combineAllP(actions).length).to.equal(3)
    })
  })

  describe('0-ary', () => {
    const actions = [
      always(Promise.resolve({ foo: 1 })),
      always(Promise.resolve({ bar: 2 })),
    ]

    it('combines the results of all functions', () =>
      combineAllP(actions, { baz: 3 }).then(res => {
        expect(res).to.eql({ foo: 1, bar: 2, baz: 3 })
      })
    )

    it('is curried', () =>
      combineAllP(actions)({ baz: 3 }).then(res => {
        expect(res).to.eql({ foo: 1, bar: 2, baz: 3 })
      })
    )

    it('returns max function length', () => {
      expect(combineAllP(actions).length).to.equal(0)
    })
  })
})
