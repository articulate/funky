const { expect } = require('chai')
const property   = require('prop-factory')

const { batch, evolveP } = require('..')

describe('batch', () => {
  const res = property()

  const obj = { a: 'a', b: 'b', c: 'c' }

  describe('with no options', () => {
    const asyncListFn = ([a, b, c]) =>
      Promise.resolve([a, b, c])

    const batched = batch(undefined, asyncListFn)

    const test = evolveP({
      a: batched,
      b: batched,
      c: batched
    })

    beforeEach(() =>
      test(obj).then(res)
    )

    it('has safe defaults', () =>
      expect(res()).to.eql(obj)
    )
  })

  describe('with a batch limit', () => {
    const asyncListFn = ({ length }) =>
      Promise.resolve(Array(length).fill(length))

    const batched = batch({ limit: 2 }, asyncListFn)

    const test = evolveP({
      a: batched,
      b: batched,
      c: batched
    })

    beforeEach(() =>
      test(obj).then(res)
    )

    it('limits the batch length', () =>
      expect(res()).to.eql({ a: 2, b: 2, c: 1 })
    )
  })

  describe('with a max wait', () => {
    const asyncListFn = ({ length }) =>
      Promise.resolve(Array(length).fill(length))

    const batched = batch({ wait: 16 }, asyncListFn)

    const delayed = x =>
      new Promise((res, rej) =>
        setTimeout(() =>
          batched(x).then(res, rej)
        , 64)
      )

    const test = evolveP({
      a: batched,
      b: batched,
      c: delayed
    })

    beforeEach(() =>
      test(obj).then(res)
    )

    it('throttles the batches', () =>
      expect(res()).to.eql({ a: 2, b: 2, c: 1 })
    )
  })
})
