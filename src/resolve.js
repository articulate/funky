const bind = require('ramda/src/bind')

// resolve :: a -> Promise a
const resolve = bind(Promise.resolve, Promise)

module.exports = resolve
