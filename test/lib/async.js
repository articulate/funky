const { curry } = require('ramda')

exports.add  = curry((a, b) => Promise.resolve(a + b))
exports.mult = curry((a, b) => Promise.resolve(a * b))
