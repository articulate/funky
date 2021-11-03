const converge = require('ramda/src/converge')
const curryN   = require('ramda/src/curryN')
const identity = require('ramda/src/identity')

// combineWith :: (c -> b -> d) -> (a -> b) -> c -> d
const combineWith = curryN(2, (mf, f) =>
  converge(mf, [ identity, f ])
)

module.exports = combineWith
