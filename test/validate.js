const Joi         = require('joi')
const { expect }  = require('chai')
const property    = require('prop-factory')
const { compose } = require('ramda')

const { validate } = require('..')

const schema = Joi.object({
  foo: Joi.string().required()
})

const good  = { foo: 'bar' }
const bad   = { foo: 12345 }
const extra = { foo: 'bar', bar: '123' }

// withNYC :: Joi -> Joi
const withNYC = joi =>
  joi.extend({
    base: joi.string(),
    name: 'string',
    language: {
      nyc: 'must have NYC in string',
    },
    rules: [
      {
        name: 'nyc',
        validate(params, value, state, options) {
          return (new RegExp(/NYC/, 'gi')).test(value)
            ? value
            : this.createError('string.nyc', { v: value }, state, options)
        },
      },
    ],
  })

// withUSA :: Joi -> Joi
const withUSA = joi =>
  joi.extend({
    base: joi.string(),
    name: 'string',
    language: {
      usa: 'must have USA in string',
    },
    rules: [
      {
        name: 'usa',
        validate(params, value, state, options) {
          return (new RegExp(/USA/, 'gi')).test(value)
            ? value
            : this.createError('string.usa', { v: value }, state, options)
        },
      },
    ],
  })

const extensions =
  compose(withNYC, withUSA)

const JoiExtended =
  extensions(Joi)

const schemaExtended = JoiExtended.object({
  foo: JoiExtended.string().nyc().usa().required()
})

const goodExtended = { foo: 'NYC, USA' }
const badExtended  = { foo: 'BLAH, USA' }

describe('validate', () => {
  const res = property()

  describe('with a valid value', () => {
    beforeEach(() =>
      validate(Joi, schema, good).then(res)
    )

    it('validates against a Joi schema', () =>
      expect(res()).to.eql(good)
    )
  })

  describe('with an invalid value', () => {
    beforeEach(() =>
      validate(Joi, schema, bad).catch(res)
    )

    it('rejects with a Joi error', () => {
      expect(res()).to.be.a('Error')
      expect(res().isJoi).to.be.true
    })
  })

  describe('with custom options', () => {
    beforeEach(() =>
      validate(Joi, schema, extra, { stripUnknown: true }).then(res)
    )

    it('respects those options', () =>
      expect(res()).to.eql({ foo: 'bar' })
    )
  })

  describe('when joi is missing', () => {
    beforeEach(() =>
      validate(null, schema, bad).then(res)
    )

    it('pass-thrus values without validation', () =>
      expect(res()).to.eql(bad)
    )
  })

  describe('with joi extended', () => {
    describe('with a valid value', () => {
      beforeEach(() =>
        validate(JoiExtended, schemaExtended, goodExtended).then(res)
      )

      it('validates against an extended Joi schema', () =>
        expect(res()).to.eql(goodExtended)
      )
    })

    describe('with an invalid value', () => {
      beforeEach(() =>
        validate(JoiExtended, schemaExtended, badExtended).catch(res)
      )

      it('rejects with an extended Joi error', () => {
        expect(res()).to.be.a('Error')
        expect(res().isJoi).to.be.true
      })
    })
  })
})
