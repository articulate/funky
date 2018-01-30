const curry        = require('ramda/src/curry')
const combineWithP = require('./combineWithP')
const put          = require('./put')

// assignP : String -> ({ k: v } -> Promise a) -> Promise { k: v }
const assignP = (key, fn) =>
  combineWithP(put(key), fn)

module.exports = curry(assignP)
