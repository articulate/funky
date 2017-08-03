const { assoc, converge, curryN, dissoc, prop } = require('ramda')

// rename : String -> String -> { k: v } -> { k: v }
const rename = curryN(2, (from, to) =>
  converge(assoc(to), [ prop(from), dissoc(from) ]))

module.exports = rename
