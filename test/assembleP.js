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

  describe('n-ary', () => {
    const assembly = assembleP({
      foo: (one, two) => Promise.resolve([ one, two ].join(',')),
      bar: {
        baz: (one, two, three) => Promise.resolve([ one, two, three ].join('|')),
      },
      bat: 1
    })

    const res = property()

    beforeEach(() =>
      assembly('one', 'two', 'three').then(res)
    )

    it('assembles the result of async transforms into a new object', () =>
      expect(res()).to.eql({
        foo: 'one,two',
        bar: { baz: 'one|two|three' },
        bat: 1,
      })
    )

    it('returns max function length', () => {
      expect(assembly.length).to.equal(3)
    })
  })
})
