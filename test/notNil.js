const { expect }  = require('chai')

const notNil = require('../src/notNil')

describe('notNill', () => {
  describe('with nil values', () => {
    it('null', () => {
      expect(notNil(null)).to.eql(false)
    })

    it('undefined', () => {
      expect(notNil(undefined)).to.eql(false)
    })
  })

  describe('with non-nil empty/falsey values', () => {
    it('[]', () => {
      expect(notNil([])).to.eql(true)
    })

    it('{}', () => {
      expect(notNil({})).to.eql(true)
    })

    it('\'\'', () => {
      expect(notNil('')).to.eql(true)
    })

    it('0', () => {
      expect(notNil(0)).to.eql(true)
    })

    it('false', () => {
      expect(notNil(false)).to.eql(true)
    })
  })

  describe('with non-nil non-empty values', () => {
    it('Arrays', () => {
      expect(notNil([ 'a', 'b', 'c' ])).to.eql(true)
    })

    it('Objects', () => {
      expect(notNil({ a: 1, b: 'yes', c: false })).to.eql(true)
    })

    it('Strings', () => {
      expect(notNil('hello world')).to.eql(true)
    })

    it('Numbers', () => {
      expect(notNil(10)).to.eql(true)
    })

    it('true', () => {
      expect(notNil(true)).to.eql(true)
    })
  })
})
