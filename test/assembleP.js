const { expect } = require('chai')
const property   = require('prop-factory')

const { add, mult } = require('./lib/async')
const { assembleP } = require('..')



describe('assembleP', () => {
  describe('unary', () => {
    const assembly = assembleP({ foo: add(1), bar: { baz: mult(3) }, bat: 1 })
    const res = property()

    beforeEach(() =>
      assembly(1).then(res)
    )

    it('assembles the result of async transforms into a new object', () =>
      expect(res()).to.eql({ foo: 2, bar: { baz: 3 }, bat: 1 })
    )
  })

  describe('unary', () => {
    const sjoin = glue => (...params) => Promise.resolve(params.join(glue))

    const assembly = assembleP({
      foo: sjoin(','),
      bar: {
        baz: sjoin('|'),
      },
      bat: 1
    })

    const res = property()

    beforeEach(() =>
      assembly('one', 'two', 'three').then(res)
    )

    it('assembles the result of async transforms into a new object', () =>
      expect(res()).to.eql({
        foo: 'one,two,three',
        bar: { baz: 'one|two|three' },
        bat: 1,
      })
    )
  })
})
