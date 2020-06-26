const curryN = require('ramda/src/curryN')

let validate

try {
  const Joi       = require('@hapi/joi')
  const defaults  = { abortEarly: false }

  validate = (schema, value, opts=defaults) => new Promise((resolve, reject) => {
    try {
      resolve(Joi.attempt(value, schema, opts))
    } catch (err) {
      reject(err)
    }
  })
}

catch (e) {
  validate = (_, x) =>
    Promise.resolve(x)
}

// validate :: Schema -> a -> Promise a
module.exports = curryN(2, validate)
