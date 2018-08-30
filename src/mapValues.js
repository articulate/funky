const adjust    = require('ramda/src/adjust')
const compose   = require('ramda/src/compose')
const curry     = require('ramda/src/curry')
const fromPairs = require('ramda/src/fromPairs')
const map       = require('ramda/src/map')
const toPairs   = require('ramda/src/toPairs')

// mapValues :: ({ k: v } -> { k: v }) -> { k: v } -> { k: v }
const mapValues = (fn, obj) =>
  compose(fromPairs, map(adjust(fn, 1)), toPairs)(obj)

module.exports = curry(mapValues)
