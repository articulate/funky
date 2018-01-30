const curry       = require('ramda/src/curry')
const combineWith = require('./combineWith')
const setProp     = require('./setProp')

// assign : String -> ({ k: v } -> a) -> { k: v }
const assign = (key, fn) =>
  combineWith(setProp(key), fn)

module.exports = curry(assign)
