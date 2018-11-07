const compose  = require('ramda/src/compose')
const identity = require('ramda/src/identity')
const juxt     = require('ramda/src/juxt')
const mergeAll = require('ramda/src/mergeAll')
const uncurryN = require('ramda/src/uncurryN')

// combineAll :: [({ k: v }, ...) -> { k: v }] -> ({ k: v }, ...) -> { k: v }
const combineAll = fns =>
  compose(mergeAll, juxt([ identity, ...fns ]))

module.exports = uncurryN(2, combineAll)
