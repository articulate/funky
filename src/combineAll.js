const compose  = require('ramda/src/compose')
const identity = require('ramda/src/identity')
const juxt     = require('ramda/src/juxt')
const mergeAll = require('ramda/src/mergeAll')

// combineAll :: [({ k: v }, ...) -> { k: v }] -> ({ k: v }, ...) -> { k: v }
const combineAll = fns =>
  compose(mergeAll, juxt([ identity, ...fns ]))

module.exports = combineAll
