const converge = require('ramda/src/converge')
const identity = require('ramda/src/identity')

const doCombine = require('./lib/doCombine')

// combineWith :: (c -> b -> d) (a -> b) -> c -> d
const combineWith = (mf, f, ...x) =>
  converge(mf, [ identity, f ])(...x)

module.exports = doCombine(combineWith)
