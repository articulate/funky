const apply   = require('ramda/src/apply')
const compose = require('ramda/src/compose')
const curry   = require('ramda/src/curry')
const map     = require('ramda/src/map')
const toPairs = require('ramda/src/toPairs')

const rename = require('./rename')

// renameAll :: { k: v } -> { k: v } -> { k: v }
const renameAll = (renames, obj) =>
  compose(apply(compose), map(apply(rename)), toPairs)(renames)(obj)

module.exports = curry(renameAll)
