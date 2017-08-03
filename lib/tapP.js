const { always, curryN } = require('ramda')

// tapP : (a -> Promise b) -> a -> Promise a
const tapP = curryN(2, (fn, x) =>
  Promise.resolve(x).then(fn).then(always(x)))

module.exports = tapP
