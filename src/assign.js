const assoc    = require('ramda/src/assoc')
const converge = require('ramda/src/converge')
const curry    = require('ramda/src/curry')
const identity = require('ramda/src/identity')

// assign : String -> ({ k: v } -> a) -> { k: v }
const assign = (key, fn) =>
  converge(assoc(key), [fn, identity])

module.exports = curry(assign)
