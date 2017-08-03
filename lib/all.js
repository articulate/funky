const { bind } = require('ramda')

// all : [Promise a] -> Promise [a]
const all = bind(Promise.all, Promise)

module.exports = all
