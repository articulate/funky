const composeP = require('ramda/src/composeP')
const identity = require('ramda/src/identity')
const mergeAll = require('ramda/src/mergeAll')

const juxtP    = require('./juxtP')

// combineAllP :: [({ k: v }, ...) -> Promise { k: v }] -> ({ k: v }, ...) -> Promise { k: v }
const combineAllP = fns =>
  composeP(mergeAll, juxtP([ identity, ...fns ]))

module.exports = combineAllP
