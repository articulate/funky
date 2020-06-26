const Joi         = require('@hapi/joi')
const { expect }  = require('chai')
const property    = require('prop-factory')

const { validateWith } = require('..')

const schema = Joi.object({
  foo: Joi.string().required()
})

const good  = { foo: 'bar' }
const bad   = { foo: 12345 }
const extra = { foo: 'bar', bar: '123' }

const JoiExtended = Joi.extend(joi => {
  return {
    base: joi.string(),
    type: 'places',
    messages: {
      'places.nyc': 'must have NYC in string',
      'places.usa': 'must have USA in string',
    },
    rules: {
      nyc: {
        validate(value, helpers) {
          return (new RegExp(/NYC/, 'gi')).test(value)
            ? value
            : helpers.error('places.nyc')
        },
      },
      usa: {
        validate(value, helpers) {
          return (new RegExp(/USA/, 'gi')).test(value)
            ? value
            : helpers.error('places.usa')
        },
      },
    },
  }
})

const schemaExtended = JoiExtended.object({
  foo: JoiExtended.places().nyc().usa().required()
})

const goodExtended = { foo: 'NYC, USA' }
const badExtended  = { foo: 'BLAH, USA' }

describe('validateWith', () => {
  const res = property()

  describe('with a valid value', () => {
    beforeEach(() =>
      validateWith(Joi, schema, good).then(res)
    )

    it('validates against a Joi schema', () =>
      expect(res()).to.eql(good)
    )
  })

  describe('with an invalid value', () => {
    beforeEach(() =>
      validateWith(Joi, schema, bad).catch(res)
    )

    it('rejects with a Joi error', () => {
      expect(res()).to.be.a('Error')
      expect(res().isJoi).to.be.true
    })
  })

  describe('with custom options', () => {
    beforeEach(() =>
      validateWith(Joi, schema, extra, { stripUnknown: true }).then(res)
    )

    it('respects those options', () =>
      expect(res()).to.eql({ foo: 'bar' })
    )
  })

  describe('with joi extended', () => {
    describe('with a valid value', () => {
      beforeEach(() =>
        validateWith(JoiExtended, schemaExtended, goodExtended).then(res)
      )

      it('validates against an extended Joi schema', () =>
        expect(res()).to.eql(goodExtended)
      )
    })

    describe('with an invalid value', () => {
      beforeEach(() =>
        validateWith(JoiExtended, schemaExtended, badExtended).catch(res)
      )

      it('rejects with an extended Joi error', () => {
        expect(res()).to.be.a('Error')
        expect(res().isJoi).to.be.true
      })
    })
  })
})
