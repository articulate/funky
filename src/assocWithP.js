const curry     = require('ramda/src/curry')
const assoc     = require('ramda/src/assoc')
const identity  = require('ramda/src/identity')
const convergeP = require('./convergeP')

// assocWithP :: String -> ({ k: v } -> Promise a) -> Promise { k: v } -> Promise { k: v }
const assocWithP = (key, fn, obj) =>
  convergeP(assoc(key), [fn, identity])(obj)

module.exports = curry(assocWithP)
