const { curry } = require('ramda')

exports.add  = curry((a, b) => Promise.resolve(a + b))
exports.mult = curry((a, b) => Promise.resolve(a * b))
exports.even = a => Promise.resolve(a % 2 === 0)
