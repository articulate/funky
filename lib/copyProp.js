const { assoc, curryN } = require('ramda')

// copyProp : String -> String -> { k: v } -> { k: v }
const copyProp = curryN(3, (from, to, obj) =>
  assoc(to, obj[from], obj))

module.exports = copyProp
