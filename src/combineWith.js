const converge = require('ramda/src/converge')
const curry = require('ramda/src/curry')
const identity = require('ramda/src/identity')

// combineWith :: (c -> b -> d) (a -> b) -> c -> d
const combineWith = (mf, f) =>
  converge(mf, [ identity, f ])

module.exports = curry(combineWith)
