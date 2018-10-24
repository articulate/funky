const curryN = require('ramda/src/curryN')

let validate

try {
  const Joi       = require('joi')
  const promisify = require('./promisify')
  const _validate = promisify(Joi.validate, Joi)
  const defaults  = { abortEarly: false }

  validate = (schema, x, opts=defaults) =>
    _validate(x, schema, opts)
}

catch (e) {
  validate = (_, x) =>
    Promise.resolve(x)
}

// validate :: Schema -> a -> Promise a
module.exports = curryN(2, validate)
