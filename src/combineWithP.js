const curryN   = require('ramda/src/curryN')
const identity = require('ramda/src/identity')

const convergeP = require('./convergeP')

// combineWithP :: (c -> b -> d) -> (a -> Promise b) -> Promise c -> Promise d
const combineWithP = curryN(2, (mf, f) =>
  convergeP(mf, [ identity, f ])
)

module.exports = combineWithP
