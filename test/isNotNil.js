const { expect }  = require('chai')

const isNotNil = require('../src/isNotNil')

describe('isNotNill', () => {
  describe('with nil values', () => {
    it('null', () => {
      expect(isNotNil(null)).to.eql(false)
    })

    it('undefined', () => {
      expect(isNotNil(undefined)).to.eql(false)
    })

    it('NaN', () => {
      expect(isNotNil(NaN)).to.eql(false)
    })
  })

  describe('with non-nil empty/falsey values', () => {
    it('[]', () => {
      expect(isNotNil([])).to.eql(true)
    })

    it('{}', () => {
      expect(isNotNil({})).to.eql(true)
    })

    it('\'\'', () => {
      expect(isNotNil('')).to.eql(true)
    })

    it('0', () => {
      expect(isNotNil(0)).to.eql(true)
    })

    it('false', () => {
      expect(isNotNil(false)).to.eql(true)
    })
  })

  describe('with non-nil non-empty values', () => {
    it('Arrays', () => {
      expect(isNotNil([ 'a', 'b', 'c' ])).to.eql(true)
    })

    it('Objects', () => {
      expect(isNotNil({ a: 1, b: 'yes', c: false })).to.eql(true)
    })

    it('Strings', () => {
      expect(isNotNil('hello world')).to.eql(true)
    })

    it('Numbers', () => {
      expect(isNotNil(10)).to.eql(true)
    })

    it('true', () => {
      expect(isNotNil(true)).to.eql(true)
    })
  })
})
