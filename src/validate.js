const curryN = require('ramda/src/curryN')
const Joi    = require('joi')

const promisify = require('./promisify')

const defaults = { abortEarly: false }

const _validate = promisify(Joi.validate, Joi)

// validate : Schema -> a -> Promise a
const validate = (schema, x, opts=defaults) =>
  _validate(x, schema, opts)

module.exports = curryN(2, validate)
