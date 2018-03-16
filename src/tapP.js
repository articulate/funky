const always = require('ramda/src/always')
const curry  = require('ramda/src/curry')

// tapP :: (a -> Promise b) -> a -> Promise a
const tapP = (fn, x) =>
  Promise.resolve(x).then(fn).then(always(x))

module.exports = curry(tapP)
