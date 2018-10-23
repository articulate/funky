const curryN = require('ramda/src/curryN')

const promisify = require('./promisify')
const defaults  = { abortEarly: false }

const validate = (joi, schema, x, opts=defaults) => {
  try {
    const _validate = promisify(joi.validate, joi)
    return _validate(x, schema, opts)
  } catch (_) {
    return Promise.resolve(x)
  }
}


// validate :: Joi -> Schema -> a -> Promise a
module.exports = curryN(3, validate)
