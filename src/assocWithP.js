const assoc     = require('ramda/src/assoc')
const curry     = require('ramda/src/curry')
const lensProp  = require('ramda/src/lensProp')
const overP     = require('./overP')

// assocWithP : String -> ({ k: v } -> Promise a) -> Promise { k: v }
const assocWithP = (key, fn) =>
  overP(lensProp(key), fn)

module.exports = curry(assocWithP)
