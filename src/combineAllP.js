const composeP = require('ramda/src/composeP')
const identity = require('ramda/src/identity')
const mergeAll = require('ramda/src/mergeAll')

const juxtP    = require('./juxtP')

// combineAllP : [a... -> Promise { k: v }] -> { k: v } -> Promise { k: v }
module.exports = fns =>
  composeP(mergeAll, juxtP([ identity, ...fns ]))
