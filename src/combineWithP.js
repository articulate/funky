const curry    = require('ramda/src/curry')
const identity = require('ramda/src/identity')

const convergeP = require('./convergeP')

// combineWithP : (c -> b -> d) (a -> Promise b) -> Promise c -> Promise d
const combineWithP = (mf, f) =>
  convergeP(mf, [ identity, f ])

module.exports = curry(combineWithP)
