const { add }    = require('ramda')
const { expect } = require('chai')

const { assemble } = require('..')

describe('assemble', () => {
  describe('unary', () => {
    const xfrms = {
      foo: add(1),
      bar: {
        baz: add(2)
      },
      bat: 1
    }

    it('assembles the result of multiple transforms into a new object', () =>
      expect(assemble(xfrms, 1)).to.eql({ foo: 2, bar: { baz: 3 }, bat: 1 })
    )

    it('is curried', () =>
      expect(assemble(xfrms)(1)).to.eql({ foo: 2, bar: { baz: 3 }, bat: 1 })
    )
  })

  describe('n-ary', () => {
    const sjoin = glue => (...params) => params.join(glue)

    const xfrms = {
      foo: sjoin(','),
      bar: {
        baz: sjoin('|'),
      },
      bat: 1
    }

    it('assembles the result of multiple transforms into a new object', () =>
      expect(assemble(xfrms, 'one', 'two', 'three')).to.eql({
        foo: 'one,two,three',
        bar: { baz: 'one|two|three' },
        bat: 1,
      })
    )

    it('is curried', () =>
      expect(assemble(xfrms)('one', 'two', 'three')).to.eql({
        foo: 'one,two,three',
        bar: { baz: 'one|two|three' },
        bat: 1,
      })
    )
  })
})
