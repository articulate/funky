const { apply, composeP, curryN } = require('ramda')

const juxtP = require('./juxtP')

// convergeP : (b -> c -> Promise d) -> [(a -> Promise b), (a -> Promise c)] -> a -> Promise d
const convergeP = curryN(2, (after, fs) =>
  composeP(apply(after), juxtP(fs)))

module.exports = convergeP
