const apply    = require('ramda/src/apply')
const composeP = require('ramda/src/composeP')
const curry    = require('ramda/src/curry')

const juxtP = require('./juxtP')

// convergeP :: (b -> c -> Promise d) -> [(a -> Promise b), (a -> Promise c)] -> a -> Promise d
const convergeP = (after, fs) =>
  composeP(apply(after), juxtP(fs))

module.exports = curry(convergeP)
