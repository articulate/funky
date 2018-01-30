const assoc     = require('ramda/src/assoc')
const curry     = require('ramda/src/curry')
const identity  = require('ramda/src/identity')
const convergeP = require('./convergeP')

// assignP : String -> ({ k: v } -> Promise a) -> Promise { k: v }
const assignP = (key, fn) =>
  convergeP(assoc(key), [fn, identity])

module.exports = curry(assignP)
