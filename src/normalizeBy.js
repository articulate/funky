const assoc    = require('ramda/src/assoc')
const reduce   = require('ramda/src/reduce')
const uncurryN = require('ramda/src/uncurryN')

// normalizeBy :: String -> [{ k: v }] -> { v: { k: v } }
const normalizeBy = id =>
  reduce(putBy(id), {})

// putBy :: String -> ({ v: { k: v } }, { k: v }) -> { v: { k: v } }
const putBy = id => (list, item) =>
  assoc(item[id], item, list)

module.exports = uncurryN(2, normalizeBy)
