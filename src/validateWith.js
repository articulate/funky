const curryN = require('ramda/src/curryN')

const promisify = require('./promisify')
const defaults  = { abortEarly: false }

const validateWith = (joi, schema, x, opts=defaults) => {
  const _validateWith = promisify(joi.validate, joi)
  return _validateWith(x, schema, opts)
}

// validateWith :: Joi -> Schema -> a -> Promise a
module.exports = curryN(3, validateWith)
