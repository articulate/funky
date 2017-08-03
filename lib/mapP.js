const { curryN } = require('ramda')

// mapP : Functor f => (a -> Promise b) -> f a -> Promise f b
const mapP = curryN(2, (f, list) =>
  Promise.all(list.map(f)))

module.exports = mapP
