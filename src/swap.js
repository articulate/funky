const curry  = require('ramda/src/curry')
const insert = require('ramda/src/insert')
const remove = require('ramda/src/remove')

// swap : Number -> Number -> [a] -> [a]
const swap = (from, to, list) =>
  insert(to, list[from], remove(from, 1, list))

module.exports = curry(swap)
