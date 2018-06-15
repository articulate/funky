const assoc = require('ramda/src/assoc')
const curry = require('ramda/src/curry')

const rename = require('./rename')

// renamePath :: [String] -> String -> { k: v } -> { k: v }
const renamePath = ([ head, ...tail ], to, obj) =>
  tail.length
    ? assoc(head, renamePath(tail, to, obj[head]), obj)
    : rename(head, to, obj)

module.exports = curry(renamePath)
