const identity = require('ramda/src/identity')
const juxt     = require('ramda/src/juxt')
const mergeAll = require('ramda/src/mergeAll')

const doCombineAll = require('./lib/doCombineAll')

// combineAll :: [({ k: v }, ...) -> { k: v }] -> ({ k: v }, ...) -> { k: v }
const combineAll = (fns, ...x) =>
  mergeAll(juxt([ identity, ...fns ])(...x))

module.exports = doCombineAll(combineAll)
