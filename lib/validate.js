const Joi = require('joi')
const { curryN, flip } = require('ramda')

const promisify = require('./promisify')

// validate : Schema -> a -> Promise a
const validate = curryN(2, flip(promisify(Joi.validate, Joi)))

module.exports = validate
