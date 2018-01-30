const curry        = require('ramda/src/curry')
const combineWithP = require('./combineWithP')
const setProp      = require('./setProp')

// assignP : String -> ({ k: v } -> Promise a) -> Promise { k: v }
const assignP = (key, fn) =>
  combineWithP(setProp(key), fn)

module.exports = curry(assignP)
