const apply    = require('ramda/src/apply')
const composeP = require('ramda/src/composeP')
const unapply  = require('ramda/src/unapply')
const uncurryN = require('ramda/src/uncurryN')
const useWith  = require('ramda/src/useWith')

const all      = require('./all')

// useWithP :: (a -> b -> Promise c) -> [(d -> Promise a), (e -> Promise b)] -> (d -> e -> Promise c)
const useWithP = fn =>
  useWith(unapply(composeP(apply(fn), all)))

module.exports = uncurryN(2, useWithP)
