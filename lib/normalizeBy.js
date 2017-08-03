const { assoc, curryN, reduce } = require('ramda')

// normalizeBy : String -> [{ k: v }] -> { k: { k: v } }
const normalizeBy = curryN(2, (id, list) =>
  reduce(putBy(id), {}, list))

// putBy : String -> ({ k: { k: v } }, { k: v }) -> { k: { k: v } }
const putBy = id => (list, item) =>
  assoc(item[id], item, list)

module.exports = normalizeBy
