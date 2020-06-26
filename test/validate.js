const Joi        = require('@hapi/joi')
const { expect } = require('chai')
const property   = require('prop-factory')
const proxyquire = require('proxyquire')

const { validate } = require('..')

const schema = Joi.object({
  foo: Joi.string().required()
})

const good  = { foo: 'bar' }
const bad   = { foo: 12345 }
const extra = { foo: 'bar', bar: '123' }

describe('validate', () => {
  const res = property()

  describe('with a valid value', () => {
    beforeEach(() =>
      validate(schema, good).then(res)
    )

    it('validates against a Joi schema', () =>
      expect(res()).to.eql(good)
    )
  })

  describe('with an invalid value', () => {
    beforeEach(() =>
      validate(schema, bad).catch(res)
    )

    it('rejects with a Joi error', () => {
      expect(res()).to.be.a('Error')
      expect(res().isJoi).to.be.true
    })
  })

  describe('with custom options', () => {
    beforeEach(() =>
      validate(schema, extra, { stripUnknown: true }).then(res)
    )

    it('respects those options', () =>
      expect(res()).to.eql({ foo: 'bar' })
    )
  })

  describe('when joi is missing', () => {
    const validate = proxyquire('../lib/validate', { '@hapi/joi': null })

    beforeEach(() =>
      validate(schema, bad).then(res)
    )

    it('pass-thrus values without validation', () =>
      expect(res()).to.eql(bad)
    )
  })
})
