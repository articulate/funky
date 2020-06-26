const curryN = require('ramda/src/curryN')

const defaults  = { abortEarly: false }

const validateWith = (joi, schema, x, opts=defaults) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(joi.attempt(x, schema, opts))
    } catch (err) {
      reject(err)
    }
  })
}

// validateWith :: Joi -> Schema -> a -> Promise a
module.exports = curryN(3, validateWith)
