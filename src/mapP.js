const curry = require('ramda/src/curry')
const map   = require('ramda/src/map')

// mapP : Functor f => (a -> Promise b) -> f a -> Promise f b
const mapP = (f, list) =>
  Promise.all(map(f, list))

module.exports = curry(mapP)
