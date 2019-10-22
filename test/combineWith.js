const { expect } = require('chai')
const add        = require('ramda/src/add')
const multiply   = require('ramda/src/multiply')

const { combineWith } = require('..')

describe('combineWith', () => {
  describe('unary', () => {
    it('combines with the results of the function', () =>
      expect(combineWith(multiply, add(2), 3)).to.eql(15)
    )

    it('has correct length', () => {
      expect(combineWith(multiply, add(2)).length).to.equal(1)
    })

    describe('argument application', () => {
      it('apply fn(x)(x)(x)', () =>
        expect(combineWith(multiply)(add(2))(3)).to.eql(15)
      )

      it('apply fn(x, x)(x)', () =>
        expect(combineWith(multiply, add(2))(3)).to.eql(15)
      )

      it('apply fn(x)(x, x)', () =>
        expect(combineWith(multiply)(add(2), 3)).to.eql(15)
      )
    })
  })

  describe('n-ary', () => {
    it('combines with the results of the function', () =>
      expect(combineWith(multiply, add, 3, 2)).to.eql(15)
    )

    it('has correct length', () => {
      expect(combineWith(multiply, add).length).to.equal(2)
    })

    describe('argument application', () => {
      it('apply fn(x)(x)(x)(x)', () =>
        expect(combineWith(multiply)(add)(3)(2)).to.eql(15)
      )

      it('apply fn(x, x)(x)(x)', () =>
        expect(combineWith(multiply, add)(3)(2)).to.eql(15)
      )

      it('apply fn(x)(x, x)(x)', () =>
        expect(combineWith(multiply)(add, 3)(2)).to.eql(15)
      )

      it('apply fn(x)(x)(x, x)', () =>
        expect(combineWith(multiply)(add)(2, 3)).to.eql(15)
      )
    })
  })
})
