const { bind } = require('ramda')

// resolve : a -> Promise a
const resolve = bind(Promise.resolve, Promise)

module.exports = resolve
