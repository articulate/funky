const assocPath = require('ramda/src/assocPath')
const curry = require('ramda/src/curry')
const path = require('ramda/src/path')

// copyPath :: [String] -> [String] -> { k: v } -> { k: v }
const copyPath = (fromPath, toPath, obj) =>
  assocPath(toPath, path(fromPath, obj), obj)

module.exports = curry(copyPath)
