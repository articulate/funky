const { apply, composeP, curry, unapply, useWith } = require('ramda')
const all = require('./all')

// useWithP :: (a -> b -> Promise c) -> [(d -> Promise a), (e -> Promise b)] -> (d -> e -> Promise c)
const useWithP = (fn, transformers) =>
  useWith(unapply(composeP(apply(fn), all)), transformers)

module.exports = curry(useWithP)
