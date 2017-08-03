const { curryN, insert, remove } = require('ramda')

// swap : Number -> Number -> [a] -> [a]
const swap = curryN(3, (from, to, list) =>
  insert(to, list[from], remove(from, 1, list)))

module.exports = swap
