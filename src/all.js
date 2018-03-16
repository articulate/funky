const bind = require('ramda/src/bind')

// all :: [Promise a] -> Promise [a]
const all = bind(Promise.all, Promise)

module.exports = all
