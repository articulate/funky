const assoc    = require('ramda/src/assoc')
const converge = require('ramda/src/converge')
const identity = require('ramda/src/identity')
const uncurryN = require('ramda/src/uncurryN')

// assocWith :: String -> ({ k: v } -> a) -> { k: v } -> { k: v }
const assocWith = (key, fn) =>
  converge(assoc(key), [fn, identity])

module.exports = uncurryN(3, assocWith)
