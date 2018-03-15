const compose = require('ramda/src/compose')
const juxt    = require('ramda/src/juxt')

const all = require('./all')

// juxtP :: [a... -> Promise b] -> a... -> Promise [b]
const juxtP = fs =>
  compose(all, juxt(fs))

module.exports = juxtP
