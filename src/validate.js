const curry = require('ramda/src/curry')
const flip  = require('ramda/src/flip')
const Joi   = require('joi')

const promisify = require('./promisify')

// validate : Schema -> a -> Promise a
const validate = flip(promisify(Joi.validate, Joi))

module.exports = curry(validate)
