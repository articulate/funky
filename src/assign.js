const curry = require('ramda/src/curry')
const combineWith = require('./combineWith')
const put = require('./put')

// assign : String -> ({ k: v } -> a) -> { k: v }
const assign = (key, fn) =>
  combineWith(put(key), fn)

module.exports = curry(assign)
