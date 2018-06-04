const { apply, composeP, curry, unapply, useWith } = require('ramda')
const all = require('./all')

// useWithP :: (b -> c -> Promise d) -> [(a -> Promise b), (a -> Promise c)] -> a -> Promise d
const useWithP = (fn, transformers) =>
  useWith(unapply(composeP(apply(fn), all)), transformers)

module.exports = curry(useWithP)
