const converge = require('ramda/src/converge')
const curry    = require('ramda/src/curry')
const assoc    = require('ramda/src/assoc')
const identity = require('ramda/src/identity')

// assocWith :: String -> ({ k: v } -> a) -> { k: v } -> { k: v }
const assocWith = (key, fn) =>
  converge(assoc(key), [fn, identity])

module.exports = curry(assocWith)
