const Joi        = require('joi')
const { expect } = require('chai')
const property   = require('prop-factory')

const { validate } = require('..')

const schema = Joi.object({
  foo: Joi.string().required()
})

const good = { foo: 'bar' }
const bad  = { foo: 12345 }

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
})
