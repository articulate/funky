const assoc = require('ramda/src/assoc')
const curry = require('ramda/src/curry')

// copyProp : String -> String -> { k: v } -> { k: v }
const copyProp = (from, to, obj) =>
  assoc(to, obj[from], obj)

module.exports = curry(copyProp)
