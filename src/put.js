const assoc = require('ramda/src/assoc')
const curry = require('ramda/src/curry')

// setProp : String -> { k: v } -> a -> { k: v }
const setProp = (key, obj, val) =>
  assoc(key, val, obj)

module.exports = curry(setProp)
