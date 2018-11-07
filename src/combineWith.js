const converge = require('ramda/src/converge')
const identity = require('ramda/src/identity')
const uncurryN = require('ramda/src/uncurryN')

// combineWith :: (c -> b -> d) (a -> b) -> c -> d
const combineWith = (mf, f) =>
  converge(mf, [ identity, f ])

module.exports = uncurryN(3, combineWith)
