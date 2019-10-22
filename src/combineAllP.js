const identity = require('ramda/src/identity')
const mergeAll = require('ramda/src/mergeAll')

const doCombineAll = require('./lib/doCombineAll')
const juxtP        = require('./juxtP')

// combineAllP :: [({ k: v }, ...) -> Promise { k: v }] -> ({ k: v }, ...) -> Promise { k: v }
const combineAllP = (fns, ...x) =>
  juxtP([ identity, ...fns ])(...x).then(mergeAll)

module.exports = doCombineAll(combineAllP)
