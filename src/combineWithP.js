const identity = require('ramda/src/identity')
const uncurryN = require('ramda/src/uncurryN')

const convergeP = require('./convergeP')

// combineWithP :: (c -> b -> d) (a -> Promise b) -> Promise c -> Promise d
const combineWithP = (mf, f) =>
  convergeP(mf, [ identity, f ])

module.exports = uncurryN(3, combineWithP)
