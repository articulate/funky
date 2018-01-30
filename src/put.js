const assoc = require('ramda/src/assoc')
const curry = require('ramda/src/curry')

// put : String -> { k: v } -> a -> { k: v }
const put = (key, obj, val) =>
  assoc(key, val, obj)

module.exports = curry(put)
