const assoc    = require('ramda/src/assoc')
const curry    = require('ramda/src/curry')
const lensProp = require('ramda/src/lensProp')
const over     = require('ramda/src/over')
const identity = require('ramda/src/identity')

// assocWith : String -> ({ k: v } -> a) -> { k: v }
const assocWith = (key, fn) =>
  over(lensProp(key), fn)

module.exports = curry(assocWith)
