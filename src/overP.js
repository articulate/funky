const __    = require('ramda/src/__')
const curry = require('ramda/src/curry')
const set   = require('ramda/src/set')
const view  = require('ramda/src/view')

// overP : Lens s => (a -> Promise b) -> s a -> Promise s b
const overP = (s, fn, data) => 
  Promise.resolve(view(s, data)).then(fn).then(set(s, __, data))

module.exports = curry(overP)
