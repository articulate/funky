const assoc  = require('ramda/src/assoc')
const curry  = require('ramda/src/curry')
const reduce = require('ramda/src/reduce')

// normalizeBy :: String -> [{ k: v }] -> { v: { k: v } }
const normalizeBy = (id, list) =>
  reduce(putBy(id), {}, list)

// putBy :: String -> ({ v: { k: v } }, { k: v }) -> { v: { k: v } }
const putBy = id => (list, item) =>
  assoc(item[id], item, list)

module.exports = curry(normalizeBy)
