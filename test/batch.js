const { expect } = require('chai')
const property   = require('prop-factory')
const Spy        = require('@articulate/spy')

const { identity, prop } = require('ramda')

const { batch, evolveP } = require('..')

describe('batch', () => {
  const obj = { a: 'a', b: 'b', c: 'c' }
  const res = property()
  const spy = Spy()

  beforeEach(() =>
    spy.reset()
  )

  describe('with no options', () => {
    const asyncListFn = ([a, b, c]) =>
      (spy(), Promise.resolve([a, b, c]))

    const batched = batch(undefined, asyncListFn)

    const test = evolveP({
      a: batched,
      b: batched,
      c: batched
    })

    beforeEach(() =>
      test(obj).then(res)
    )

    it('has safe defaults', () => {
      expect(res()).to.eql(obj)
      expect(spy.calls.length).to.equal(1)
    })
  })

  describe('with a batch limit', () => {
    const asyncListFn = ({ length }) =>
      (spy(), Promise.resolve(Array(length).fill(length)))

    const batched = batch({ limit: 2 }, asyncListFn)

    const test = evolveP({
      a: batched,
      b: batched,
      c: batched
    })

    beforeEach(() =>
      test(obj).then(res)
    )

    it('limits the batch length', () => {
      expect(res()).to.eql({ a: 2, b: 2, c: 1 })
      expect(spy.calls.length).to.equal(2)
    })
  })

  describe('with a max wait', () => {
    const asyncListFn = ({ length }) =>
      (spy(), Promise.resolve(Array(length).fill(length)))

    const batched = batch({ wait: 16 }, asyncListFn)

    const delayed = x =>
      new Promise((res, rej) =>
        setTimeout(() => {
          batched(x).then(res, rej)
        }, 64)
      )

    const test = evolveP({
      a: batched,
      b: batched,
      c: delayed
    })

    beforeEach(() =>
      test(obj).then(res)
    )

    it('throttles the batches', () => {
      expect(res()).to.eql({ a: 2, b: 2, c: 1 })
      expect(spy.calls.length).to.equal(2)
    })
  })

  describe('with duplicate args', () => {
    const obj = { a: 'a', b: 'a' }

    const asyncListFn = () =>
      (spy(), Promise.resolve(['dupe']))

    const batched = batch(undefined, asyncListFn)

    const test = evolveP({
      a: batched,
      b: batched
    })

    beforeEach(() =>
      test(obj).then(res)
    )

    it('shares promises with duplicate args to only batch uniqs', () => {
      expect(res()).to.eql({ a: 'dupe', b: 'dupe' })
      expect(spy.calls.length).to.equal(1)
    })
  })

  describe('with matching enabled', () => {
    const asyncListFn = () =>
      (spy(), Promise.resolve([{ id: 'c' }, { id: 'b' }]))

    const batched =
      batch({ inputKey: identity, outputKey: prop('id') }, asyncListFn)

    const test = evolveP({
      a: batched,
      b: batched,
      c: batched
    })

    beforeEach(() =>
      test(obj).then(res)
    )

    it('matches each result to the original input', () => {
      expect(spy.calls.length).to.equal(1)
      expect(res()).to.eql({
        a: undefined,
        b: { id: 'b' },
        c: { id: 'c' }
      })
    })
  })
})
