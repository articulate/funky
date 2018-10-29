const { add }    = require('ramda')
const { expect } = require('chai')

const { assemble } = require('..')

describe('assemble', () => {
  describe('unary', () => {
    const xfrms = {
      foo: [[ add(1) ]],
      bar: [{ baz: add(2) }],
      bat: 1
    }

    context('when partially applied', () => {
      it('assembles the result of multiple transforms into a new object', () =>
        expect(assemble(xfrms)(1)).to.eql({ foo: [[ 2 ]], bar: [{ baz: 3 }], bat: 1 })
      )
    })

    context('when all arguments provided', () => {
      it('assembles the result of multiple transforms into a new object', () =>
        expect(assemble(xfrms, 1)).to.eql({ foo: [[ 2 ]], bar: [{ baz: 3 }], bat: 1 })
      )
    })
  })

  describe('n-ary', () => {
    const xfrms = {
      foo: (one, two) => [ one, two ].join(','),
      bar: {
        baz: (one, two, three) => [ one, two, three ].join('|'),
      },
      bat: 1
    }

    context('when partially applied', () => {
      it('assembles the result of multiple transforms into a new object', () => {
        const expectation = {
          foo: 'one,two',
          bar: { baz: 'one|two|three' },
          bat: 1,
        }
        expect(assemble(xfrms)('one', 'two', 'three')).to.eql(expectation)
        expect(assemble(xfrms)('one')('two', 'three')).to.eql(expectation)
        expect(assemble(xfrms)('one')('two')('three')).to.eql(expectation)
      })
    })

    context('when all arguments provided', () => {
      it('assembles the result of multiple transforms into a new object', () =>
        expect(assemble(xfrms, 'one', 'two', 'three')).to.eql({
          foo: 'one,two',
          bar: { baz: 'one|two|three' },
          bat: 1,
        })
      )
    })

    it('returns max function length', () => {
      expect(assemble(xfrms).length).to.equal(3)
    })
  })

  describe('0-ary', () => {
    const xfrms = {
      foo: (...params) => params.join(','),
      bar: {
        baz: (...params) => params.join('|'),
      },
      bat: 1
    }

    context('when partially applied', () => {
      it('assembles the result of multiple transforms into a new object', () => {
        const expectation = {
          foo: 'one,two,three',
          bar: { baz: 'one|two|three' },
          bat: 1,
        }
        expect(assemble(xfrms)('one', 'two', 'three')).to.eql(expectation)
      })
    })

    context('when all arguments provided', () => {
      it('assembles the result of multiple transforms into a new object', () =>
        expect(assemble(xfrms, 'one', 'two', 'three')).to.eql({
          foo: 'one,two,three',
          bar: { baz: 'one|two|three' },
          bat: 1,
        })
      )
    })

    it('returns max function length', () => {
      expect(assemble(xfrms).length).to.equal(0)
    })
  })
})
